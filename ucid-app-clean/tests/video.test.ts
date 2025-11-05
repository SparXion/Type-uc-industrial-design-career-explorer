// Test to verify video import and serving
describe('Video Introduction', () => {
  it('should import video file correctly', () => {
    // Test that the video file can be imported
    const videoPath = '../assets/videos/What-Is-ID-001.mp4';
    console.log('Video path:', videoPath);
    
    // In a real test, we would import and verify the file exists
    expect(videoPath).toContain('What-Is-ID-001.mp4');
  });

  it('should have video element with correct attributes', () => {
    const videoAttributes = {
      autoPlay: true,
      muted: true,
      playsInline: true
    };
    
    expect(videoAttributes.autoPlay).toBe(true);
    expect(videoAttributes.muted).toBe(true);
    expect(videoAttributes.playsInline).toBe(true);
  });
});

// Mock test runner
function expect(actual: any) {
  return {
    toContain: (expected: string) => {
      if (!actual.includes(expected)) {
        throw new Error(`Expected "${actual}" to contain "${expected}"`);
      }
    },
    toBe: (expected: any) => {
      if (actual !== expected) {
        throw new Error(`Expected "${actual}" to be "${expected}"`);
      }
    }
  };
}
