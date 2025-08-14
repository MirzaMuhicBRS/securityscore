// src/App.tsx
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TenantProvider } from "./context/TenantContext";

// Layouts
import AppLayout from "./layout/AppLayout";
import AlternativeLayout from "./layout/AlternativeLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";


// ---- Dashboards (lazy) ----
const Securityscore = lazy(() => import("./pages/Dashboard/Securityscore"));
const Ecommerce = lazy(() => import("./pages/Dashboard/Ecommerce"));
const Stocks = lazy(() => import("./pages/Dashboard/Stocks"));
const Crm = lazy(() => import("./pages/Dashboard/Crm"));
const Marketing = lazy(() => import("./pages/Dashboard/Marketing"));
const Analytics = lazy(() => import("./pages/Dashboard/Analytics"));
const Logistics = lazy(() => import("./pages/Dashboard/Logistics"));
const ManageTenants = lazy(() => import("./pages/Tenants/ManageTenants"));

// ---- Auth Pages (lazy) ----
const SignIn = lazy(() => import("./pages/AuthPages/SignIn"));
const SignUp = lazy(() => import("./pages/AuthPages/SignUp"));
const ResetPassword = lazy(() => import("./pages/AuthPages/ResetPassword"));
const TwoStepVerification = lazy(() => import("./pages/AuthPages/TwoStepVerification"));

// ---- Other Pages (lazy) ----
const NotFound = lazy(() => import("./pages/OtherPage/NotFound"));
const Maintenance = lazy(() => import("./pages/OtherPage/Maintenance"));
const Success = lazy(() => import("./pages/OtherPage/Success"));
const FiveZeroZero = lazy(() => import("./pages/OtherPage/FiveZeroZero"));
const FiveZeroThree = lazy(() => import("./pages/OtherPage/FiveZeroThree"));
const ComingSoon = lazy(() => import("./pages/OtherPage/ComingSoon"));
const Integrations = lazy(() => import("./pages/OtherPage/Integrations"));
const ApiKeys = lazy(() => import("./pages/OtherPage/ApiKeys"));
const Invoices = lazy(() => import("./pages/Invoices"));

// ---- Applications (lazy) ----
const Calendar = lazy(() => import("./pages/Calendar"));
const FileManager = lazy(() => import("./pages/FileManager"));
const Chats = lazy(() => import("./pages/Chat/Chats"));
const TaskList = lazy(() => import("./pages/Task/TaskList"));
const TaskKanban = lazy(() => import("./pages/Task/TaskKanban"));

// ---- Ecommerce (lazy) ----
const ProductList = lazy(() => import("./pages/Ecommerce/ProductList"));
const AddProduct = lazy(() => import("./pages/Ecommerce/AddProduct"));
const Billing = lazy(() => import("./pages/Ecommerce/Billing"));
const SingleInvoice = lazy(() => import("./pages/Ecommerce/SingleInvoice"));
const CreateInvoice = lazy(() => import("./pages/Ecommerce/CreateInvoice"));
const Transactions = lazy(() => import("./pages/Ecommerce/Transactions"));
const SingleTransaction = lazy(() => import("./pages/Ecommerce/SingleTransaction"));

// ---- Support (lazy) ----
const TicketList = lazy(() => import("./pages/Support/TicketList"));
const TicketReply = lazy(() => import("./pages/Support/TicketReply"));

// ---- Emails (lazy) ----
const EmailInbox = lazy(() => import("./pages/Email/EmailInbox"));
const EmailDetails = lazy(() => import("./pages/Email/EmailDetails"));

// ---- Forms (lazy) ----
const FormElements = lazy(() => import("./pages/Forms/FormElements"));
const FormLayout = lazy(() => import("./pages/Forms/FormLayout"));

// ---- Tables (lazy) ----
const BasicTables = lazy(() => import("./pages/Tables/BasicTables"));
const DataTables = lazy(() => import("./pages/Tables/DataTables"));

// ---- Charts (lazy) ----
const LineChart = lazy(() => import("./pages/Charts/LineChart"));
const BarChart = lazy(() => import("./pages/Charts/BarChart"));
const PieChart = lazy(() => import("./pages/Charts/PieChart"));

// ---- UI Elements (lazy) ----
const Alerts = lazy(() => import("./pages/UiElements/Alerts"));
const Avatars = lazy(() => import("./pages/UiElements/Avatars"));
const Badges = lazy(() => import("./pages/UiElements/Badges"));
const BreadCrumb = lazy(() => import("./pages/UiElements/BreadCrumb"));
const Buttons = lazy(() => import("./pages/UiElements/Buttons"));
const ButtonsGroup = lazy(() => import("./pages/UiElements/ButtonsGroup"));
const Cards = lazy(() => import("./pages/UiElements/Cards"));
const Carousel = lazy(() => import("./pages/UiElements/Carousel"));
const Dropdowns = lazy(() => import("./pages/UiElements/Dropdowns"));
const Images = lazy(() => import("./pages/UiElements/Images"));
const Links = lazy(() => import("./pages/UiElements/Links"));
const Lists = lazy(() => import("./pages/UiElements/Lists"));
const Modals = lazy(() => import("./pages/UiElements/Modals"));
const Notifications = lazy(() => import("./pages/UiElements/Notifications"));
const Pagination = lazy(() => import("./pages/UiElements/Pagination"));
const Popovers = lazy(() => import("./pages/UiElements/Popovers"));
const Progressbar = lazy(() => import("./pages/UiElements/Progressbar"));
const Ribbons = lazy(() => import("./pages/UiElements/Ribbons"));
const Spinners = lazy(() => import("./pages/UiElements/Spinners"));
const Tabs = lazy(() => import("./pages/UiElements/Tabs"));
const Tooltips = lazy(() => import("./pages/UiElements/Tooltips"));
const Videos = lazy(() => import("./pages/UiElements/Videos"));

// ---- Misc (lazy) ----
const PricingTables = lazy(() => import("./pages/PricingTables"));
const Faqs = lazy(() => import("./pages/Faqs"));
const Blank = lazy(() => import("./pages/Blank"));
const UserProfiles = lazy(() => import("./pages/UserProfiles"));

// ---- AI Pages (lazy) ----
const TextGeneratorPage = lazy(() => import("./pages/Ai/TextGenerator"));
const ImageGeneratorPage = lazy(() => import("./pages/Ai/ImageGenerator"));
const CodeGeneratorPage = lazy(() => import("./pages/Ai/CodeGenerator"));
const VideoGeneratorPage = lazy(() => import("./pages/Ai/VideoGenerator"));

function Loader() {
  return (
    <div className="p-6 text-sm text-gray-500 dark:text-gray-400">
      Laddar…
    </div>
  );
}

export default function App() {
  return (
    <TenantProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Dashboard layout */}
            <Route element={<AppLayout />}>
              {/* Start-sida */}
              <Route path="/" element={<Securityscore />} />

              {/* Dashboards */}
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/marketing" element={<Marketing />} />
              <Route path="/crm" element={<Crm />} />
              <Route path="/stocks" element={<Stocks />} />
              <Route path="/ecommerce" element={<Ecommerce />} />
              <Route path="/logistics" element={<Logistics />} />

              {/* Apps */}
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/invoice" element={<Invoices />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/chat" element={<Chats />} />
              <Route path="/file-manager" element={<FileManager />} />
              <Route path="/tenants" element={<ManageTenants />} />

              {/* Ecommerce */}
              <Route path="/product-list" element={<ProductList />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/single-invoice" element={<SingleInvoice />} />
              <Route path="/create-invoice" element={<CreateInvoice />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/single-transaction" element={<SingleTransaction />} />

              {/* Support */}
              <Route path="/ticket-list" element={<TicketList />} />
              <Route path="/ticket-reply" element={<TicketReply />} />

              {/* Other */}
              <Route path="/profile" element={<UserProfiles />} />
              <Route path="/faq" element={<Faqs />} />
              <Route path="/pricing-tables" element={<PricingTables />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/api-keys" element={<ApiKeys />} />
              <Route path="/blank" element={<Blank />} />

              {/* Forms */}
              <Route path="/form-elements" element={<FormElements />} />
              <Route path="/form-layout" element={<FormLayout />} />

              {/* Tasks */}
              <Route path="/task-list" element={<TaskList />} />
              <Route path="/task-kanban" element={<TaskKanban />} />

              {/* Email */}
              <Route path="/inbox" element={<EmailInbox />} />
              <Route path="/inbox-details" element={<EmailDetails />} />

              {/* Tables */}
              <Route path="/basic-tables" element={<BasicTables />} />
              <Route path="/data-tables" element={<DataTables />} />

              {/* Charts */}
              <Route path="/line-chart" element={<LineChart />} />
              <Route path="/bar-chart" element={<BarChart />} />
              <Route path="/pie-chart" element={<PieChart />} />
            </Route>

            {/* AI layout */}
            <Route element={<AlternativeLayout />}>
              <Route path="/text-generator" element={<TextGeneratorPage />} />
              <Route path="/image-generator" element={<ImageGeneratorPage />} />
              <Route path="/code-generator" element={<CodeGeneratorPage />} />
              <Route path="/video-generator" element={<VideoGeneratorPage />} />
            </Route>

            {/* Auth */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/two-step-verification" element={<TwoStepVerification />} />

            {/* Status / Fallback */}
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/success" element={<Success />} />
            <Route path="/five-zero-zero" element={<FiveZeroZero />} />
            <Route path="/five-zero-three" element={<FiveZeroThree />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </TenantProvider>
  );
}
