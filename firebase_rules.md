# Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Public Read / Restricted Write for Field Guide & Almanac Articles
    match /articles/{articleId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Public Submit for Dear Red & Things I Should Have Said (Unapproved submissions default to approved: false)
    match /dear_red_submissions/{submissionId} {
      allow read: if resource.data.approved == true || (request.auth != null && request.auth.token.admin == true);
      allow create: if request.resource.data.body is string 
                    && request.resource.data.body.size() > 5 
                    && request.resource.data.body.size() <= 5000
                    && request.resource.data.approved == false;
      allow update, delete: if request.auth != null && request.auth.token.admin == true;
    }
    
    match /things_unsaid/{submissionId} {
      allow read: if resource.data.approved == true || (request.auth != null && request.auth.token.admin == true);
      allow create: if request.resource.data.content is string 
                    && request.resource.data.content.size() > 5 
                    && request.resource.data.content.size() <= 3000
                    && request.resource.data.approved == false;
      allow update, delete: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```
