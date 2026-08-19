/**
 * Vercel Serverless Function: Email Subscription Handler
 * Primary Target: Substack ("Other People's Weather") & Flexible CRM Provider Integration
 * Route: /api/subscribe
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Content-Type'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  try {
    const { email, source = 'website_footer' } = req.body || {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide a valid email address.' 
      });
    }

    const cleanEmail = email.trim();
    const substackBaseUrl = process.env.SUBSTACK_URL || 'https://otherpeoplesweather.substack.com';
    const convertkitApiKey = process.env.CONVERTKIT_API_KEY;
    const convertkitFormId = process.env.CONVERTKIT_FORM_ID;
    const customWebhookUrl = process.env.SUBSCRIBE_WEBHOOK_URL;

    // 1. Webhook Integration (if configured)
    if (customWebhookUrl) {
      await fetch(customWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, source, timestamp: new Date().toISOString() })
      });
    }

    // 2. ConvertKit Integration (if configured)
    if (convertkitApiKey && convertkitFormId) {
      const convertkitUrl = `https://api.convertkit.com/v3/forms/${convertkitFormId}/subscribe`;
      const response = await fetch(convertkitUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: convertkitApiKey,
          email: cleanEmail,
          tags: [source]
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'ConvertKit API error');
      }
    }

    // 3. Primary Default: Substack Subscription Landing
    const substackSubscribeUrl = `${substackBaseUrl}/subscribe?email=${encodeURIComponent(cleanEmail)}`;

    return res.status(200).json({
      success: true,
      message: 'Subscription initiated! Redirecting to Substack dispatches...',
      provider: 'substack',
      substackUrl: substackSubscribeUrl,
      email: cleanEmail
    });

  } catch (error) {
    console.error('[API Subscribe Error]:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'An unexpected error occurred. Please try again later.'
    });
  }
}
