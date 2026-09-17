import React, { useState } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  User,
  Contact,
  Landmark,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { LoginRole, GovernmentIdType, UserSession } from '../types';
import { PoliceCrest } from './PoliceCrest';
import { api } from '../services/api';

interface LoginCardProps {
  onLoginSuccess: (session: UserSession) => void;
}

export const LoginCard: React.FC<LoginCardProps> = ({ onLoginSuccess }) => {
  // In the reference image, Investigator Login is the active tab by default
  const [activeRole, setActiveRole] = useState<LoginRole>('investigator');

  // Investigator fields (as shown in reference image)
  const [usernameEmail, setUsernameEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Government ID fields
  const [idType, setIdType] = useState<GovernmentIdType>('NIC');
  const [govIdNumber, setGovIdNumber] = useState('');
  const [govPassword, setGovPassword] = useState('');
  const [showGovPassword, setShowGovPassword] = useState(false);

  // State
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Demo autofill
  const handleAutofillDemo = () => {
    if (activeRole === 'investigator') {
      setUsernameEmail('officer.sharma@police.gov.in');
      setPassword('Demo@123');
    } else {
      setIdType('NIC');
      setGovIdNumber('DEMO-GOV-001');
      setGovPassword('Demo@123');
    }
    setErrorMessage('');
  };

  const handleInvestigatorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!usernameEmail.trim()) {
      setErrorMessage('Please enter your Username / Email.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.login({
        role: 'investigator',
        username: usernameEmail.trim(),
        password,
      });
      setIsLoading(false);
      if (response.success && response.session) {
        onLoginSuccess(response.session);
      } else {
        setErrorMessage(response.message || 'Authentication failed. Please check credentials.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Authentication error.');
    }
  };

  const handleGovernmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!govIdNumber.trim()) {
      setErrorMessage('Please enter your Government ID Number.');
      return;
    }
    if (!govPassword) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.login({
        role: 'government-id',
        idType,
        govIdNumber: govIdNumber.trim(),
        password: govPassword,
      });
      setIsLoading(false);
      if (response.success && response.session) {
        onLoginSuccess(response.session);
      } else {
        setErrorMessage(response.message || 'National Security Verification failed.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Authentication error.');
    }
  };

  return (
    <div
      id="login-card-container"
      className="w-full max-w-[450px] bg-white/88 backdrop-blur-xl rounded-[22px] shadow-2xl shadow-slate-950/40 border border-white/70 p-7 sm:p-8 flex flex-col justify-between select-none relative transition-all duration-300"
    >
      <div>
        {/* Police Crest / Shield at the top */}
        <div className="flex flex-col items-center text-center mb-4">
          <PoliceCrest size={46} className="mb-2 drop-shadow-sm" />
          
          <div className="space-y-0.5">
            <span className="block text-[11px] font-semibold tracking-[0.25em] text-[#0C2340] uppercase">
              AI-POWERED
            </span>
            <h1 className="text-xl sm:text-[22px] font-extrabold tracking-wider text-[#0C2340] uppercase font-sans leading-tight">
              CRIMINAL NETWORK
            </h1>
            <span className="block text-[12px] font-bold tracking-[0.3em] text-[#0C2340] uppercase mt-0.5">
              ANALYSIS SYSTEM
            </span>
          </div>

          <p className="text-[12px] text-slate-500 font-normal tracking-normal mt-1.5 mb-2">
            Secure Access for Authorized Personnel
          </p>
        </div>

        {/* Role Switcher Tabs (Investigator Login | Government ID Login) */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#EEF2F6] rounded-lg border border-slate-200/80 mb-5">
          {/* Investigator Login Tab (ACTIVE in reference image) */}
          <button
            type="button"
            id="tab-investigator"
            onClick={() => {
              setActiveRole('investigator');
              setErrorMessage('');
            }}
            className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeRole === 'investigator'
                ? 'bg-[#0B2144] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Investigator Login</span>
          </button>

          {/* Government ID Login Tab */}
          <button
            type="button"
            id="tab-government-id"
            onClick={() => {
              setActiveRole('government-id');
              setErrorMessage('');
            }}
            className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeRole === 'government-id'
                ? 'bg-[#0B2144] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Contact className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Government ID Login</span>
          </button>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="mb-4 p-2.5 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs flex items-center gap-2 animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form area */}
        {activeRole === 'investigator' ? (
          /* ====================================================
             INVESTIGATOR LOGIN FORM (Exact match to reference image)
             ==================================================== */
          <form id="investigator-login-form" onSubmit={handleInvestigatorSubmit} className="space-y-3.5">
            {/* Field 1: Username / Email */}
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Mail className="w-4 h-4 stroke-[1.6]" />
              </div>
              <input
                id="input-username-email"
                type="text"
                placeholder="Username / Email"
                value={usernameEmail}
                onChange={(e) => setUsernameEmail(e.target.value)}
                autoComplete="username"
                className="w-full h-11 pl-10 pr-3.5 bg-[#F8FAFC] hover:bg-white focus:bg-white border border-slate-200/90 rounded-lg text-xs md:text-[13px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0B2144] focus:border-[#0B2144] placeholder:text-slate-400 transition"
              />
            </div>

            {/* Field 2: Password with Eye Toggle */}
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Lock className="w-4 h-4 stroke-[1.6]" />
              </div>
              <input
                id="input-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full h-11 pl-10 pr-10 bg-[#F8FAFC] hover:bg-white focus:bg-white border border-slate-200/90 rounded-lg text-xs md:text-[13px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0B2144] focus:border-[#0B2144] placeholder:text-slate-400 transition"
              />
              <button
                type="button"
                id="toggle-password-visibility"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <Eye className="w-4 h-4 stroke-[1.6]" /> : <EyeOff className="w-4 h-4 stroke-[1.6]" />}
              </button>
            </div>

            {/* Row: Remember me checkbox + Forgot Password? link */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="checkbox-remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 accent-[#0284c7] cursor-pointer"
                />
                <span className="text-xs text-slate-700 font-medium">Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => alert('Password reset verification instructions dispatched to registered police/gov email.')}
                className="text-xs text-[#0284c7] hover:text-[#0369a1] font-medium transition cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {/* Primary Action Button: Saffron to Green gradient with "→ Sign In" */}
            <button
              type="submit"
              id="btn-sign-in"
              disabled={isLoading}
              className="w-full h-11 mt-1 bg-gradient-to-r from-[#FF7A00] via-[#E26800] to-[#15803D] hover:opacity-95 active:scale-[0.99] text-white rounded-lg text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-md shadow-orange-950/20 transition-all cursor-pointer disabled:opacity-75"
            >
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
              <span>{isLoading ? 'Verifying Credentials...' : 'Sign In'}</span>
            </button>

            {/* OR Separator */}
            <div className="relative my-3.5 text-center">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <span className="relative px-3 bg-white/95 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                OR
              </span>
            </div>

            {/* Secondary Button: Login with Government ID */}
            <button
              type="button"
              id="btn-login-with-gov-id"
              onClick={() => {
                setActiveRole('government-id');
                setErrorMessage('');
              }}
              className="w-full h-11 bg-white hover:bg-slate-50 border border-[#0B2144] text-[#0B2144] rounded-lg text-xs md:text-sm font-semibold flex items-center justify-center gap-2.5 transition shadow-2xs cursor-pointer"
            >
              <Landmark className="w-4 h-4 text-[#0B2144] stroke-[1.8]" />
              <span>Login with Government ID</span>
            </button>
          </form>
        ) : (
          /* ====================================================
             GOVERNMENT ID LOGIN FORM
             ==================================================== */
          <form id="gov-id-login-form" onSubmit={handleGovernmentSubmit} className="space-y-3.5">
            {/* Government ID Type Selector */}
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Landmark className="w-4 h-4 stroke-[1.6]" />
              </div>
              <select
                id="select-gov-id-type"
                value={idType}
                onChange={(e) => setIdType(e.target.value as GovernmentIdType)}
                className="w-full h-11 pl-10 pr-4 bg-[#F8FAFC] hover:bg-white focus:bg-white border border-slate-200/90 rounded-lg text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#0B2144] focus:border-[#0B2144] transition cursor-pointer"
              >
                <option value="NIC">National Informatics Centre (NIC) ID</option>
                <option value="POLICE">Police Officer / IPS Service ID</option>
                <option value="IB">Intelligence Bureau (IB) Credential</option>
                <option value="CBI">Central Bureau of Investigation (CBI) ID</option>
                <option value="NIA">National Investigation Agency (NIA) ID</option>
                <option value="MHA">Ministry of Home Affairs (MHA) ID</option>
                <option value="STATE_CID">State CID / Crime Branch ID</option>
              </select>
            </div>

            {/* Government ID Number */}
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <User className="w-4 h-4 stroke-[1.6]" />
              </div>
              <input
                id="input-gov-id-number"
                type="text"
                placeholder="Government ID Number (e.g. DEMO-GOV-001)"
                value={govIdNumber}
                onChange={(e) => setGovIdNumber(e.target.value)}
                className="w-full h-11 pl-10 pr-3.5 bg-[#F8FAFC] hover:bg-white focus:bg-white border border-slate-200/90 rounded-lg text-xs md:text-[13px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0B2144] focus:border-[#0B2144] placeholder:text-slate-400 transition"
              />
            </div>

            {/* Government ID Password */}
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Lock className="w-4 h-4 stroke-[1.6]" />
              </div>
              <input
                id="input-gov-password"
                type={showGovPassword ? 'text' : 'password'}
                placeholder="Password"
                value={govPassword}
                onChange={(e) => setGovPassword(e.target.value)}
                className="w-full h-11 pl-10 pr-10 bg-[#F8FAFC] hover:bg-white focus:bg-white border border-slate-200/90 rounded-lg text-xs md:text-[13px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0B2144] focus:border-[#0B2144] placeholder:text-slate-400 transition"
              />
              <button
                type="button"
                id="toggle-gov-password-visibility"
                onClick={() => setShowGovPassword(!showGovPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                aria-label={showGovPassword ? 'Hide password' : 'Show password'}
              >
                {showGovPassword ? <Eye className="w-4 h-4 stroke-[1.6]" /> : <EyeOff className="w-4 h-4 stroke-[1.6]" />}
              </button>
            </div>

            {/* Remember me row */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="checkbox-gov-remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 accent-[#0284c7] cursor-pointer"
                />
                <span className="text-xs text-slate-700 font-medium">Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => alert('MHA Portal Helpdesk: Contact NIC nodal administrator for reset.')}
                className="text-xs text-[#0284c7] hover:text-[#0369a1] font-medium transition cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {/* Primary Action Button: Saffron to Green gradient */}
            <button
              type="submit"
              id="btn-gov-sign-in"
              disabled={isLoading}
              className="w-full h-11 mt-1 bg-gradient-to-r from-[#FF7A00] via-[#E26800] to-[#15803D] hover:opacity-95 active:scale-[0.99] text-white rounded-lg text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-md shadow-orange-950/20 transition-all cursor-pointer disabled:opacity-75"
            >
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
              <span>{isLoading ? 'Verifying Government ID...' : 'Sign In with Government ID'}</span>
            </button>

            {/* OR Separator */}
            <div className="relative my-3.5 text-center">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <span className="relative px-3 bg-white/95 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                OR
              </span>
            </div>

            {/* Switch back to Investigator Login */}
            <button
              type="button"
              id="btn-back-to-investigator"
              onClick={() => {
                setActiveRole('investigator');
                setErrorMessage('');
              }}
              className="w-full h-11 bg-white hover:bg-slate-50 border border-[#0B2144] text-[#0B2144] rounded-lg text-xs md:text-sm font-semibold flex items-center justify-center gap-2.5 transition shadow-2xs cursor-pointer"
            >
              <User className="w-4 h-4 text-[#0B2144] stroke-[1.8]" />
              <span>Login as Police Investigator</span>
            </button>
          </form>
        )}

        {/* Subtle Demo Account Autofill helper */}
        <div className="mt-3.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Demo Test Access</span>
          </div>
          <button
            type="button"
            id="btn-autofill-demo"
            onClick={handleAutofillDemo}
            className="text-[11px] text-[#0B2144] hover:text-sky-700 font-semibold underline underline-offset-2 cursor-pointer"
          >
            Autofill Demo Credentials
          </button>
        </div>
      </div>

      {/* ====================================================
         Card Footer: Three security indicators (Matches reference image)
         🔒 Encrypted Connection | 🛡 Authorized Personnel Only | 🛡 Secure Environment
         ==================================================== */}
      <div className="mt-5 pt-3.5 border-t border-slate-200/80 grid grid-cols-3 divide-x divide-slate-200 text-center">
        {/* Item 1 */}
        <div className="px-1 flex items-center justify-center gap-1.5 text-slate-700">
          <Lock className="w-4 h-4 text-slate-700 shrink-0 stroke-[1.75]" />
          <span className="text-[10.5px] font-normal leading-tight text-slate-600 text-left">
            Encrypted<br />Connection
          </span>
        </div>

        {/* Item 2 */}
        <div className="px-1 flex items-center justify-center gap-1.5 text-slate-700">
          <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0 stroke-[1.75]" />
          <span className="text-[10.5px] font-normal leading-tight text-slate-600 text-left">
            Authorized<br />Personnel Only
          </span>
        </div>

        {/* Item 3 */}
        <div className="px-1 flex items-center justify-center gap-1.5 text-slate-700">
          <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0 stroke-[1.75]" />
          <span className="text-[10.5px] font-normal leading-tight text-slate-600 text-left">
            Secure<br />Environment
          </span>
        </div>
      </div>
    </div>
  );
};
