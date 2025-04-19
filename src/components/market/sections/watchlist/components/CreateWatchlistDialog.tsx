
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateWatchlistDialogProps } from "../types";

/**
 * Dialog for creating a new watchlist
 * 
 * @param props - Component properties
 * @returns Create watchlist dialog component
 */
const CreateWatchlistDialog: React.FC<CreateWatchlistDialogProps> = ({
  isOpen,
  setIsOpen,
  watchlistName,
  setWatchlistName,
  handleCreate
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Watchlist</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            value={watchlistName}
            onChange={(e) => setWatchlistName(e.target.value)}
            placeholder="Watchlist name"
            className="w-full"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>
            Create Watchlist
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWatchlistDialog;
