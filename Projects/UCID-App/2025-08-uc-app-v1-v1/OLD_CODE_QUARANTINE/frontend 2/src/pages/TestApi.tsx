import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  TextField,
  Alert,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  CheckCircle,
  Error,
  Info,
  School,
  Work,
  Psychology,
  TrendingUp
} from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';
import { 
  studentService, 
  careerService, 
  companyService, 
  aiService, 
  practiceProjectService 
} from '../services';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

const TestApi: React.FC = () => {
  const { state, setError, clearError } = useAppContext();
  const [testResults, setTestResults] = useState<Record<string, any>>({});
  const [runningTests, setRunningTests] = useState(false);
  const [studentId, setStudentId] = useState('');

  const runAllTests = async () => {
    setRunningTests(true);
    setTestResults({});
    clearError();

    try {
      // Test 1: API Health Check
      console.log('Testing API Health Check...');
      const healthResponse = await fetch('http://localhost:5000/api/health');
      const healthData = await healthResponse.json();
      setTestResults(prev => ({ ...prev, health: { success: healthResponse.ok, data: healthData } }));

      // Test 2: Get Careers
      console.log('Testing Get Careers...');
      const careersResponse = await careerService.getCareers();
      setTestResults(prev => ({ ...prev, careers: careersResponse }));

      // Test 3: Get Companies
      console.log('Testing Get Companies...');
      const companiesResponse = await companyService.getCompanies();
      setTestResults(prev => ({ ...prev, companies: companiesResponse }));

      // Test 4: Get Practice Projects
      console.log('Testing Get Practice Projects...');
      const projectsResponse = await practiceProjectService.getProjects();
      setTestResults(prev => ({ ...prev, projects: projectsResponse }));

      // Test 5: AI Service Status
      console.log('Testing AI Service Status...');
      const aiStatusResponse = await aiService.getStatus();
      setTestResults(prev => ({ ...prev, aiStatus: aiStatusResponse }));

      // Test 6: Create a test student if we have an ID
      if (studentId) {
        console.log('Testing Student Operations...');
        const studentResponse = await studentService.getStudent(studentId);
        setTestResults(prev => ({ ...prev, student: studentResponse }));
      }

    } catch (error: unknown) {
      console.error('Test execution failed:', error);
      const errorMessage = error instanceof Error ? (error as any).message : 'Unknown error';
      setError('Test execution failed: ' + errorMessage);
    } finally {
      setRunningTests(false);
    }
  };

  const runSingleTest = async (testName: string, testFunction: () => Promise<any>) => {
    setRunningTests(true);
    clearError();

    try {
      console.log(`Running ${testName}...`);
      const result = await testFunction();
      setTestResults(prev => ({ ...prev, [testName]: result }));
    } catch (error: unknown) {
      console.error(`${testName} failed:`, error);
      const errorMessage = error instanceof Error ? (error as any).message : 'Unknown error';
      setError(`${testName} failed: ` + errorMessage);
    } finally {
      setRunningTests(false);
    }
  };

  const getTestStatus = (testName: string) => {
    const result = testResults[testName];
    if (!result) return 'pending';
    if (result.error) return 'error';
    return 'success';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle color="success" />;
      case 'error':
        return <Error color="error" />;
      case 'pending':
        return <Info color="disabled" />;
      default:
        return <Info color="disabled" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'success.main';
      case 'error':
        return 'error.main';
      case 'pending':
        return 'text.disabled';
      default:
        return 'text.disabled';
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center', my: 4 }}>
        API Integration Test Suite
      </Typography>

      {/* Global Error Display */}
      {state.error && (
        <ErrorDisplay 
          error={state.error} 
          onDismiss={clearError}
          severity="error"
          title="Test Error"
        />
      )}

      {/* Test Controls */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Test Controls
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Student ID (optional)"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter student ID to test student operations"
                helperText="Leave empty to skip student-specific tests"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  onClick={runAllTests}
                  disabled={runningTests}
                  size="large"
                >
                  Run All Tests
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setTestResults({})}
                  disabled={runningTests}
                >
                  Clear Results
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Loading State */}
      {runningTests && (
        <Box display="flex" justifyContent="center" my={4}>
          <LoadingSpinner message="Running tests..." />
        </Box>
      )}

      {/* Test Results */}
      <Grid container spacing={3}>
        {/* Health Check */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                {getStatusIcon(getTestStatus('health'))}
                <Typography variant="h6">API Health Check</Typography>
              </Box>
              <Button
                variant="outlined"
                size="small"
                onClick={() => runSingleTest('health', async () => {
                  const response = await fetch('http://localhost:5000/api/health');
                  return { success: response.ok, data: await response.json() };
                })}
                disabled={runningTests}
                sx={{ mb: 2 }}
              >
                Test Health
              </Button>
              {testResults.health && (
                <Box>
                  <Chip 
                    label={testResults.health.success ? 'Healthy' : 'Unhealthy'}
                    color={testResults.health.success ? 'success' : 'error'}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Status: {testResults.health.data?.status || 'Unknown'}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Careers */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                {getStatusIcon(getTestStatus('careers'))}
                <Typography variant="h6">Careers Service</Typography>
              </Box>
              <Button
                variant="outlined"
                size="small"
                onClick={() => runSingleTest('careers', () => careerService.getCareers())}
                disabled={runningTests}
                sx={{ mb: 2 }}
              >
                Test Careers
              </Button>
              {testResults.careers && (
                <Box>
                  <Chip 
                    label={testResults.careers.error ? 'Failed' : 'Success'}
                    color={testResults.careers.error ? 'error' : 'success'}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  {testResults.careers.data && (
                    <Typography variant="body2" color="text.secondary">
                      Found {testResults.careers.data.careers?.length || 0} careers
                    </Typography>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Companies */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                {getStatusIcon(getTestStatus('companies'))}
                <Typography variant="h6">Companies Service</Typography>
              </Box>
              <Button
                variant="outlined"
                size="small"
                onClick={() => runSingleTest('companies', () => companyService.getCompanies())}
                disabled={runningTests}
                sx={{ mb: 2 }}
              >
                Test Companies
              </Button>
              {testResults.companies && (
                <Box>
                  <Chip 
                    label={testResults.companies.error ? 'Failed' : 'Success'}
                    color={testResults.companies.error ? 'error' : 'success'}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  {testResults.companies.data && (
                    <Typography variant="body2" color="text.secondary">
                      Found {testResults.companies.data.companies?.length || 0} companies
                    </Typography>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Practice Projects */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                {getStatusIcon(getTestStatus('projects'))}
                <Typography variant="h6">Practice Projects Service</Typography>
              </Box>
              <Button
                variant="outlined"
                size="small"
                onClick={() => runSingleTest('projects', () => practiceProjectService.getProjects())}
                disabled={runningTests}
                sx={{ mb: 2 }}
              >
                Test Projects
              </Button>
              {testResults.projects && (
                <Box>
                  <Chip 
                    label={testResults.projects.error ? 'Failed' : 'Success'}
                    color={testResults.projects.error ? 'error' : 'success'}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  {testResults.projects.data && (
                    <Typography variant="body2" color="text.secondary">
                      Found {testResults.projects.data.projects?.length || 0} projects
                    </Typography>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* AI Service */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                {getStatusIcon(getTestStatus('aiStatus'))}
                <Typography variant="h6">AI Service Status</Typography>
              </Box>
              <Button
                variant="outlined"
                size="small"
                onClick={() => runSingleTest('aiStatus', () => aiService.getStatus())}
                disabled={runningTests}
                sx={{ mb: 2 }}
              >
                Test AI Status
              </Button>
              {testResults.aiStatus && (
                <Box>
                  <Chip 
                    label={testResults.aiStatus.error ? 'Failed' : 'Success'}
                    color={testResults.aiStatus.error ? 'error' : 'success'}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  {testResults.aiStatus.data && (
                    <Typography variant="body2" color="text.secondary">
                      Status: {testResults.aiStatus.data.status || 'Unknown'}
                    </Typography>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Student Service */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                {getStatusIcon(getTestStatus('student'))}
                <Typography variant="h6">Student Service</Typography>
              </Box>
              <Button
                variant="outlined"
                size="small"
                onClick={() => runSingleTest('student', () => studentService.getStudent(studentId))}
                disabled={runningTests || !studentId}
                sx={{ mb: 2 }}
              >
                Test Student
              </Button>
              {testResults.student && (
                <Box>
                  <Chip 
                    label={testResults.student.error ? 'Failed' : 'Success'}
                    color={testResults.student.error ? 'error' : 'success'}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  {testResults.student.data && (
                    <Typography variant="body2" color="text.secondary">
                      Student: {testResults.student.data.first_name} {testResults.student.data.last_name}
                    </Typography>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Summary */}
      {Object.keys(testResults).length > 0 && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Test Summary
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(testResults).map(([testName, result]) => (
                <Grid item xs={12} sm={6} md={4} key={testName}>
                  <Box display="flex" alignItems="center" gap={1}>
                    {getStatusIcon(getTestStatus(testName))}
                    <Typography variant="body2">
                      {testName}: {getTestStatus(testName)}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default TestApi;
