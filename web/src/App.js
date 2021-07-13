// import './App.css';
import { Route, Switch } from 'react-router-dom';
import LoginForm from '../src/components/loginPage';
import RegistrationForm from '../src/components/registrationPage';
import ReportSubmission from '../src/components/reportSubmissionPage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={LoginForm} />
      <Route exact path="/register" component={RegistrationForm} />
      <Route exact path="/report-submission" component={ReportSubmission} />
    </Switch>
  );
}

export default App;
