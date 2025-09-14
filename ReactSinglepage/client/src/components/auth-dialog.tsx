import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FcGoogle } from "react-icons/fc";
import { useToast } from '@/hooks/use-toast';
import OTPVerificationDialog from './otp-verification-dialog';

interface AuthDialogProps {
  children: React.ReactNode;
}


export default function AuthDialog({ children }: AuthDialogProps) {
  const [phone, setPhone] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const { toast } = useToast();


  const handleContinue = () => {
    if (!phone.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập số điện thoại",
        variant: "destructive",
      });
      return;
    }

    // Validate phone number format (Vietnamese phone number)
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập số điện thoại hợp lệ",
        variant: "destructive",
      });
      return;
    }

    // Close phone input dialog and show OTP dialog
    setIsOpen(false);
    setShowOTPDialog(true);
  };

  const handleOTPVerificationSuccess = (userData: any) => {
    // Store token in localStorage
    localStorage.setItem('auth_token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user));
    
    // Close OTP dialog
    setShowOTPDialog(false);
    setPhone('');
    
    // Reload page to update UI
    window.location.reload();
  };

  const handleOTPDialogClose = () => {
    setShowOTPDialog(false);
    // Reopen phone input dialog
    setIsOpen(true);
  };

  const handleGoogleLogin = () => {
    toast({
      title: "Tính năng sắp có",
      description: "Đăng nhập Google sẽ được hỗ trợ trong phiên bản tiếp theo",
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="max-w-[480px] p-0 overflow-hidden">
          <div className="p-6">
            <DialogHeader className="text-left">
              <DialogTitle className="text-2xl font-bold">XIN CHÀO,</DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
                Vui lòng nhập điện thoại để tiếp tục
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6">
              <label className="text-sm font-semibold block mb-2">Số điện thoại</label>
              <Input 
                placeholder="Nhập số điện thoại" 
                className="h-12 rounded-lg border-gray-300 bg-white"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                maxLength={11}
              />
              <Button 
                className="mt-4 w-full h-12 rounded-lg text-base font-medium"
                onClick={handleContinue}
                disabled={!phone.trim()}
                style={{
                  backgroundColor: phone.trim() ? '#3b82f6' : '#d1d5db',
                  color: phone.trim() ? 'white' : '#6b7280'
                }}
              >
                Tiếp tục
              </Button>
            </div>

            <div className="mt-6 flex items-center">
              <div className="h-px bg-gray-200 flex-1" />
              <span className="px-3 text-sm text-gray-500">Hoặc</span>
              <div className="h-px bg-gray-200 flex-1" />
            </div>

            <div className="mt-4">
              <Button 
                className="w-full h-12 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-base font-medium flex items-center justify-center gap-3"
                onClick={handleGoogleLogin}
              >
                <FcGoogle className="h-5 w-5" />
                Tiếp tục với Google
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <OTPVerificationDialog
        isOpen={showOTPDialog}
        onClose={handleOTPDialogClose}
        phoneNumber={phone}
        onVerificationSuccess={handleOTPVerificationSuccess}
      />
    </>
  );
}
