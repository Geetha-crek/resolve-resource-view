
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Cases from "./pages/Cases";
import Users from "./pages/Users";
import UserForm from "./pages/UserForm";
import Documents from "./pages/Documents";
import Notes from "./pages/Notes";
import Discussions from "./pages/Discussions";
import Timeline from "./pages/Timeline";
import RelatedTickets from "./pages/RelatedTickets";
import ExternalLinks from "./pages/ExternalLinks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/new" element={<UserForm />} />
            <Route path="/users/edit/:id" element={<UserForm />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/discussions" element={<Discussions />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/related-tickets" element={<RelatedTickets />} />
            <Route path="/external-links" element={<ExternalLinks />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
