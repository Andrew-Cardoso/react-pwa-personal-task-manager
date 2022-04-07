interface TestResultPassed {
	passed: true;
}

interface TestResultFailed {
	passed: false;
	message: string;
}

export type TestResult = TestResultPassed | TestResultFailed;