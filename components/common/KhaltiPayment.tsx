import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"


export const KhaltiPayment = () => {
    return (
        <Dialog>
            <DialogTrigger className="relative h-8 w-8">
                Khalti
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Khalti Payment</DialogTitle>
                    <DialogDescription asChild>
                        this is the Khalti payment form
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}