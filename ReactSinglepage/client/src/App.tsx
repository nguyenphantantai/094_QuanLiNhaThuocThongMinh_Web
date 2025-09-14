import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import CartPage from "@/pages/cart";
import CheckoutPage from "@/pages/checkout";
import MedicinePage from "@/pages/medicine";
import LookupPage from "@/pages/lookup";
import SupplementsPage from "@/pages/supplements";
import MomBabyPage from "@/pages/mom-baby";
import PersonalCarePage from "@/pages/personal-care";
import BeautyCarePage from "@/pages/beauty-care";
import MedicalDevicesPage from "@/pages/medical-devices";
import { CartProvider } from "@/hooks/use-cart";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/cart" component={CartPage} />
      <Route path="/checkout" component={CheckoutPage} />
      <Route path="/thuoc" component={MedicinePage} />
      <Route path="/benh" component={LookupPage} />
      <Route path="/thuc-pham" component={SupplementsPage} />
      <Route path="/me-va-be" component={MomBabyPage} />
      <Route path="/cham-soc-ca-nhan" component={PersonalCarePage} />
      <Route path="/cham-soc-sac-dep" component={BeautyCarePage} />
      <Route path="/thiet-bi-y-te" component={MedicalDevicesPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <CartProvider>
          <Router />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
