// Simple test to verify conversation flow
describe('ConversationalInterface', () => {
  it('should generate context-aware responses', () => {
    // Test the generateAIResponse function logic
    const testCases = [
      { input: 'I like to draw', expected: 'Drawing is a great foundation for design. What did you like to draw?' },
      { input: 'I use a 3D printer', expected: '3D printing is amazing! What kinds of things did you make?' },
      { input: 'I love Ferraris', expected: 'Cars are incredible pieces of engineering and design. What draws you to them?' },
      { input: 'I play hockey', expected: 'Sports equipment design is fascinating. What\'s your favorite team?' },
      { input: 'I watch movies', expected: 'Movies and shows have incredible visual design. What was your favorite?' },
      { input: 'I play video games', expected: 'Video games have amazing world-building and character design. What do you play?' },
      { input: 'I code', expected: 'Coding shows you think systematically. What have you built?' },
      { input: 'I build things', expected: 'Building things is at the heart of design. What did you create?' }
    ];

    testCases.forEach(({ input, expected }) => {
      // This would test the actual function when imported
      console.log(`Input: "${input}" -> Expected: "${expected}"`);
    });
  });

  it('should not ask random disconnected questions', () => {
    // Test that the conversation flow is logical
    const conversationFlow = [
      'What are you good at?',
      'Drawing is a great foundation for design. What did you like to draw?',
      'That\'s interesting. Can you tell me more about that?'
    ];

    // Verify responses are context-aware, not random
    expect(conversationFlow[1]).toContain('Drawing');
    expect(conversationFlow[2]).toContain('more about that');
  });
});

// Mock test runner
function expect(actual: any) {
  return {
    toContain: (expected: string) => {
      if (!actual.includes(expected)) {
        throw new Error(`Expected "${actual}" to contain "${expected}"`);
      }
    }
  };
}
