import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import AdminRegisterPage from './components/AdminRegisterPage';
import ServiceAdvisorRegisterPage from './components/ServiceAdvisorRegisterPage';
import LoginPage from './components/LoginPage';
import AdminLoginPage from './components/AdminLoginPage';
import ServiceAdvisorLoginPage from './components/ServiceAdvisorLoginPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import AdminResetPasswordPage from './components/AdminResetPasswordPage';
import ServiceAdvisorResetPasswordPage from './components/ServiceAdvisorResetPasswordPage';
import AdminDashboardPage from './components/AdminDashboardPage';
import CustomerDashboardPage from './components/CustomerDashboardPage';
import ServiceAdvisorDashboardPage from './components/ServiceAdvisorDashboardPage';
import AddBookingPage from './components/AddBookingPage';



function App() {
	
	
  return (

    <Router>
      <Switch>

		<Route path="/register" component={RegisterPage} />
		<Route path="/admin/register" component={AdminRegisterPage} />
		<Route path="/service-advisor/register" component={ServiceAdvisorRegisterPage} />
        <Route path="/admin/login" component={AdminLoginPage} />
        <Route path="/admin/reset-password" component={AdminResetPasswordPage} />
        <Route path="/admin/dashboard" component={AdminDashboardPage} />
        <Route path="/customer/login" component={LoginPage} />
        <Route path="/customer/reset-password" component={ResetPasswordPage} />
        <Route path="/customer/dashboard" component={CustomerDashboardPage} />
		<Route path="/customer/add-booking" component={AddBookingPage} />
        <Route path="/service-advisor/login" component={ServiceAdvisorLoginPage} />
        <Route path="/service-advisor/reset-password" component={ServiceAdvisorResetPasswordPage} />
        <Route path="/service-advisor/dashboard" component={ServiceAdvisorDashboardPage} />
      </Switch>
    </Router>
	
	
	

  );
}

export default App;
