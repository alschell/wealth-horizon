
import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";
import TranslatedText from "@/components/ui/translated-text";

interface ContactSuccessModalProps {
  showSuccessModal: boolean;
  setShowSuccessModal: (value: boolean) => void;
}

const ContactSuccessModal: React.FC<ContactSuccessModalProps> = ({
  showSuccessModal,
  setShowSuccessModal
}) => {
  return (
    <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
      <DialogContent className="sm:max-w-md flex flex-col items-center justify-center p-8" hideCloseButton>
        <div className="flex flex-col items-center justify-center w-full space-y-4 py-6">
          <CheckCheck className="h-12 w-12 text-[#4E46DC]" />
          
          <DialogTitle className="text-xl font-semibold text-center mt-2">
            <TranslatedText>Message sent successfully!</TranslatedText>
          </DialogTitle>
          
          <div className="text-center space-y-1">
            <p className="text-gray-700">
              <TranslatedText>Thank you for your message.</TranslatedText>
            </p>
            <p className="text-gray-700">
              <TranslatedText>We will get back to you within 1-2 working days.</TranslatedText>
            </p>
          </div>
        </div>
        
        <DialogFooter className="w-full flex justify-center mt-4">
          <Button 
            onClick={() => setShowSuccessModal(false)}
            className="bg-black text-white hover:bg-gray-800"
          >
            <TranslatedText>Close</TranslatedText>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactSuccessModal;
