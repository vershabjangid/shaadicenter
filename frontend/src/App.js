import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/website/auth/Login';
import { Page404 } from './pages/errorpages/Page404';
import { SomethingWentWrong } from './pages/errorpages/SomethingWentWrong';
import { Register } from './pages/website/auth/Register';
import { OtpVerification } from './pages/website/auth/OtpVerification';
import { CreateProfile } from './pages/website/auth/CreateProfile';
import { DashLogin } from './pages/dashboard/auth/DashLogin';
import { DashPrivate } from './pages/dashboard/auth/DashPrivate';
import { Dashboard } from './pages/dashboard/main/Dashboard';
import { DashUsers } from './pages/dashboard/main/DashUsers';
import { DashUserProfile } from './pages/dashboard/main/DashUserProfile';
import { DashReligion } from './pages/dashboard/main/DashReligion';
import { DashUpdateReligion } from './pages/dashboard/main/Dashupdatepages/DashUpdateReligion';
import { DashCaste } from './pages/dashboard/main/DashCaste';
import { DashUpdateCaste } from './pages/dashboard/main/Dashupdatepages/DashUpdateCaste';
import { DashMotherTongue } from './pages/dashboard/main/DashMotherTongue';
import { DashUpdateMotherTongue } from './pages/dashboard/main/Dashupdatepages/DashUpdateMotherTongue';
import { DashRegions } from './pages/dashboard/main/DashRegions';
import { DashUpdateRegions } from './pages/dashboard/main/Dashupdatepages/DashUpdateRegions';
import { DashEducation } from './pages/dashboard/main/DashEducation';
import { DashUpdateEducation } from './pages/dashboard/main/Dashupdatepages/DashUpdateEducation';
import { DashOccupation } from './pages/dashboard/main/DashOccupation';
import { DashUpdateOccupation } from './pages/dashboard/main/Dashupdatepages/DashUpdateOccupation';
import { DashThemes } from './pages/dashboard/main/DashThemes';
import { ForgotPassword } from './pages/website/auth/ForgotPassword';
import { ForgotOtp } from './pages/website/auth/ForgotOtp';
import { ChangePassword } from './pages/website/auth/ChangePassword';
import { ViewProfile } from './pages/website/main/ViewProfile';
import { ProfessionalDetails } from './pages/website/auth/ProfessionalDetails';
import { ResidentialDetails } from './pages/website/auth/ResidentialDetails';
import { FamilyInfo } from './pages/website/auth/FamilyInfo';
import { UpdateMyself } from './pages/website/main/profileupdate/UpdateMyself';
import { UpdateBasic } from './pages/website/main/profileupdate/UpdateBasic';
import { UpdateProfessional } from './pages/website/main/profileupdate/UpdateProfessional';
import { UpdateContact } from './pages/website/main/profileupdate/UpdateContact';
import { UpdateFamily } from './pages/website/main/profileupdate/UpdateFamily';
import { UpdateProfilePicture } from './pages/website/main/profileupdate/UpdateProfilePicture';
import { Home } from './pages/website/main/Home';
import { DashHome } from './pages/dashboard/main/DashHome';
import { HomeLayout } from './pages/dashboard/main/Home Components/HomeLayout';
import { DashUpdateHomeBanner } from './pages/dashboard/main/Home Components/DashUpdateHomeBanner';
import { DashUpdateHomeWhyChoose } from './pages/dashboard/main/Home Components/DashUpdateHomeWhyChoose';
import { DashUpdateHomeFeaturedProfile } from './pages/dashboard/main/Home Components/DashUpdateHomeFeaturedProfile';
import { DashUpdateSuccessStories } from './pages/dashboard/main/Home Components/DashUpdateSuccessStories';
import { AboutUs } from './pages/website/main/AboutUs';
import { DashAbout } from './pages/dashboard/main/DashAbout';
import { AboutLayout } from './pages/dashboard/main/About Components/AboutLayout';
import { DashUpdateAboutBanner } from './pages/dashboard/main/About Components/DashUpdateAboutBanner';
import { DashUpdateAboutParagraph } from './pages/dashboard/main/About Components/DashUpdateAboutParagraph';
import { DashUpdateSubParagraph } from './pages/dashboard/main/About Components/DashUpdateSubParagraph';
import { Search } from './pages/website/main/Search';
import { ViewSearchProfiles } from './pages/website/main/ViewSearchProfiles';
import { SendIntrest } from './pages/website/main/SendIntrest';
import { SuccessfullyIntrest } from './pages/website/main/SuccessfullyIntrest';
import { ViewInterests } from './pages/website/main/ViewInterests';
import { ViewMessages } from './pages/website/main/ViewMessages';
import { PaymentSummary } from './pages/website/main/PaymentSummary';
import { DashPayments } from './pages/dashboard/main/DashPayments';
import { DashViewPayment } from './pages/dashboard/main/DashViewPayment';
import { Plans } from './pages/website/main/Plans';
import { PlanVerification } from './pages/website/main/PlanVerification';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Page404 />} />
        <Route path='/error' element={<SomethingWentWrong />} />
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/sign-in' element={<Login />} />
        <Route path='/sign-up' element={<Register />} />
        <Route path='/otp-verification/:Email' element={<OtpVerification />} />
        <Route path='/create-profile/:token' element={<CreateProfile />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/forgot-otp/:Email' element={<ForgotOtp />} />
        <Route path='/change-password/:token' element={<ChangePassword />} />
        <Route path='/professional-details/:Id' element={<ProfessionalDetails />} />
        <Route path='/residential-details/:Id' element={<ResidentialDetails />} />
        <Route path='/family-details/:Id' element={<FamilyInfo />} />
        <Route path='/view-profile/:Id' element={<ViewProfile />} />
        <Route path='/update-profile-picture' element={<UpdateProfilePicture />} />
        <Route path='/update-myself/:_id/:About' element={<UpdateMyself />} />
        <Route path='/update-basic' element={<UpdateBasic />} />
        <Route path='/update-professional' element={<UpdateProfessional />} />
        <Route path='/update-contact' element={<UpdateContact />} />
        <Route path='/update-family' element={<UpdateFamily />} />
        <Route path='/search' element={<Search />} />
        <Route path='/profile/:Sub_id' element={<ViewSearchProfiles />} />
        <Route path='/send-intrest/:Receiver_id' element={<SendIntrest />} />
        <Route path='/success-send-intrest' element={<SuccessfullyIntrest />} />
        <Route path='/interests/:UserName' element={<ViewInterests />} />
        <Route path='/view-messages/:UserName' element={<ViewMessages />} />
        <Route path='/membership-plans' element={<Plans />} />
        <Route path='/payment-summary' element={<PaymentSummary />} />


        <Route path='/dash-login' element={<DashLogin />} />
        <Route element={<DashPrivate />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dash-users' element={<DashUsers />} />
          <Route path='/dash-home' element={<DashHome />} />
          <Route path='/home-layout' element={<HomeLayout />} />
          <Route path='/dash-updatehomebanner' element={<DashUpdateHomeBanner />} />
          <Route path='/dash-updatehomewhychoose' element={<DashUpdateHomeWhyChoose />} />
          <Route path='/dash-updatefeaturedprofiles' element={<DashUpdateHomeFeaturedProfile />} />
          <Route path='/dash-updatesucccessstories' element={<DashUpdateSuccessStories />} />
          <Route path='/dash-about' element={<DashAbout />} />
          <Route path='/about-layout' element={<AboutLayout />} />
          <Route path='/dash-updateaboutbanner' element={<DashUpdateAboutBanner />} />
          <Route path='/dash-updateaboutparagraph' element={<DashUpdateAboutParagraph />} />
          <Route path='/dash-updateaboutsubparagraph' element={<DashUpdateSubParagraph />} />

          <Route path='/view-users-profile/:_id' element={<DashUserProfile />} />
          <Route path='/dash-religions' element={<DashReligion />} />
          <Route path='/dash-update-religions/:_id/:ReligionName/:Status' element={<DashUpdateReligion />} />
          <Route path='/dash-caste' element={<DashCaste />} />
          <Route path='/dash-update-caste/:_id/:CasteName/:ReligionName/:Status' element={<DashUpdateCaste />} />
          <Route path='/dash-mothertongue' element={<DashMotherTongue />} />
          <Route path='/dash-update-mothertongue/:_id/:MotherTongueName/:Status' element={<DashUpdateMotherTongue />} />
          <Route path='/dash-regions' element={<DashRegions />} />
          <Route path='/dash-update-regions/:_id/:CountryName/:CountryStatus' element={<DashUpdateRegions />} />
          <Route path='/dash-update-regions/:_id/:StateName/:CountryName1/:StateStatus' element={<DashUpdateRegions />} />
          <Route path='/dash-update-regions/:_id/:DistrictName/:CountryName2/:StateName1/:DistrictStatus' element={<DashUpdateRegions />} />
          <Route path='/dash-education' element={<DashEducation />} />
          <Route path='/dash-update-education/:_id/:EducationName/:Status' element={<DashUpdateEducation />} />
          <Route path='/dash-occupation' element={<DashOccupation />} />
          <Route path='/dash-update-occupation/:_id/:OccupationName/:Status' element={<DashUpdateOccupation />} />
          <Route path='/dash-themes' element={<DashThemes />} />
          <Route path='/dash-payments' element={<DashPayments />} />
          <Route path='/view-payments' element={<DashViewPayment />} />
          /dash-payments
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
