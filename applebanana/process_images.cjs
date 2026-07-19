const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'images');

const processImage = async (filename, options) => {
  const filepath = path.join(publicDir, filename);
  const temppath = path.join(publicDir, 'temp_' + filename);
  
  try {
    const metadata = await sharp(filepath).metadata();
    const width = metadata.width;
    const height = metadata.height;
    
    // Calculate 3:2 crop
    const targetHeight = Math.round(width * 2 / 3);
    const top = Math.round((height - targetHeight) / 2);
    
    let pipeline = sharp(filepath)
      .extract({ left: 0, top: top, width: width, height: targetHeight });
      
    if (options.modulate) {
      pipeline = pipeline.modulate(options.modulate);
    }
    
    if (options.linear) {
      pipeline = pipeline.linear(options.linear.a, options.linear.b);
    }

    await pipeline.toFile(temppath);
    fs.renameSync(temppath, filepath);
    console.log(`Processed ${filename}`);
  } catch (err) {
    console.error(`Error processing ${filename}:`, err);
  }
};

const run = async () => {
  // Red Coat: saturation and red boost, brightness lift
  await processImage('the_red_coat_new.jpg', {
    modulate: { brightness: 1.15, saturation: 1.3 },
    linear: { a: 1.1, b: 5 } // contrast lift
  });
  
  // Folded Map: warmer paper, clearer red route (contrast + sat)
  await processImage('the_folded_map_new.jpg', {
    modulate: { brightness: 1.1, saturation: 1.2 },
    linear: { a: 1.1, b: 0 }
  });
  
  // Lantern: brighter internal amber light
  await processImage('the_lantern_new.jpg', {
    modulate: { brightness: 1.2, saturation: 1.2 },
    linear: { a: 1.15, b: 0 }
  });
  
  // Compass: brighter parchment, defined needle
  await processImage('the_compass_new.jpg', {
    modulate: { brightness: 1.2, saturation: 1.1 },
    linear: { a: 1.1, b: 5 }
  });
  
  // Stone: lift shadow detail
  await processImage('the_stone_new.jpg', {
    modulate: { brightness: 1.35, saturation: 1.1 }, // lift shadows a lot
    linear: { a: 1.05, b: 15 }
  });
  
  // Bucket: separate from background
  await processImage('the_bucket_new.jpg', {
    modulate: { brightness: 1.25, saturation: 1.15 },
    linear: { a: 1.1, b: 10 }
  });
  
  console.log("All done!");
};

run();
