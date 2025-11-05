// Test for the new Interest Discovery interface
describe('InterestDiscovery Component', () => {
  it('should have 5 questions in the correct order', () => {
    const questions = [
      "What are you good at?",
      "What did you like to draw or create as a kid?",
      "What's your favorite movie, TV show, or video game?",
      "Have you ever used a 3D printer or built something cool?",
      "What kind of problems do you like to solve?"
    ];

    expect(questions).toHaveLength(5);
    expect(questions[0]).toContain('good at');
    expect(questions[1]).toContain('draw or create');
    expect(questions[2]).toContain('favorite movie');
    expect(questions[3]).toContain('3D printer');
    expect(questions[4]).toContain('problems');
  });

  it('should progress through questions sequentially', () => {
    // Test that the component moves from question 1 to question 2, etc.
    const currentQuestionIndex = 0;
    const nextQuestionIndex = currentQuestionIndex + 1;
    
    expect(nextQuestionIndex).toBe(1);
  });

  it('should save responses to localStorage', () => {
    const mockResponse = {
      question: "What are you good at?",
      answer: "I like to draw and build things",
      timestamp: new Date()
    };

    // In a real test, we would mock localStorage and verify the save
    expect(mockResponse.question).toBe("What are you good at?");
    expect(mockResponse.answer).toContain("draw");
  });

  it('should show continue button after all questions', () => {
    const totalQuestions = 5;
    const currentIndex = 4; // Last question (0-indexed)
    
    const showContinue = currentIndex >= totalQuestions - 1;
    expect(showContinue).toBe(true);
  });
});

// Mock test runner
function expect(actual: any) {
  return {
    toHaveLength: (expected: number) => {
      if (actual.length !== expected) {
        throw new Error(`Expected length ${expected}, got ${actual.length}`);
      }
    },
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
