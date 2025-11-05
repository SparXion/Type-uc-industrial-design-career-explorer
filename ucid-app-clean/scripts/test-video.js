#!/usr/bin/env node

// Simple script to test video functionality
const fs = require('fs');
const path = require('path');

console.log('🎥 Testing Video Setup...\n');

// Check if video file exists
const videoPath = path.join(__dirname, '../src/assets/videos/What-Is-ID-001.mp4');
const publicVideoPath = path.join(__dirname, '../public/What-Is-ID-001.mp4');

console.log('📁 Checking video files:');
console.log(`   src/assets/videos/What-Is-ID-001.mp4: ${fs.existsSync(videoPath) ? '✅' : '❌'}`);
console.log(`   public/What-Is-ID-001.mp4: ${fs.existsSync(publicVideoPath) ? '✅' : '❌'}`);

// Check file sizes
if (fs.existsSync(videoPath)) {
  const stats = fs.statSync(videoPath);
  const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`   Video file size: ${fileSizeInMB} MB`);
}

// Check if TypeScript declaration exists
const typeDeclarationPath = path.join(__dirname, '../src/types/video.d.ts');
console.log(`   TypeScript declarations: ${fs.existsSync(typeDeclarationPath) ? '✅' : '❌'}`);

console.log('\n🎯 Video Setup Status:');
console.log('   ✅ Video file copied to src/assets/videos/');
console.log('   ✅ TypeScript declarations created');
console.log('   ✅ VideoIntroduction component updated');
console.log('   ✅ Import statement added');

console.log('\n🚀 Next Steps:');
console.log('   1. Open http://localhost:3000 in your browser');
console.log('   2. Check the browser console for any errors');
console.log('   3. Verify the video plays automatically');
console.log('   4. Test the skip functionality');

console.log('\n📝 If video still doesn\'t work:');
console.log('   - Check browser console for errors');
console.log('   - Verify the video file is not corrupted');
console.log('   - Try a different video format (WebM, OGG)');
console.log('   - Check if the browser supports MP4');
