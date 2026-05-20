import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { ManiDOroHome } from "@/pages/ManiDOroHome";
import { CollectionPage } from "@/pages/CollectionPage";
import { ContactPage } from "@/pages/ContactPage";
import { BespokePage } from "@/pages/BespokePage";
import { ProductPage } from "@/pages/ProductPage";
import { AdminPage } from "@/pages/AdminPage";
import { ArchivePage } from "@/pages/ArchivePage";
import { StoryPage } from "@/pages/StoryPage";
import { JournalPage } from "@/pages/JournalPage";
import { ShippingPage, ReturnsPage, PrivacyPage, TermsPage } from "@/pages/PolicyPages";
import { CartProvider } from "@/lib/CartContext";
import { CartDrawer } from "@/components/CartDrawer";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={ManiDOroHome} />
      <Route path="/collection" component={CollectionPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/bespoke" component={BespokePage} />
      <Route path="/product/:id" component={ProductPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/archive" component={ArchivePage} />
      <Route path="/story" component={StoryPage} />
      <Route path="/journal" component={JournalPage} />
      <Route path="/shipping" component={ShippingPage} />
      <Route path="/returns" component={ReturnsPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <CartDrawer />
          <Router base={base}>
            <AppRoutes />
          </Router>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
