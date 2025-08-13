import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,DialogOverlay } from "../ui/dialog"

export const EsewaPayment = () => {
    return (
        <Dialog>
            <DialogOverlay onClick={(event) => {event.stopPropagation(); event.preventDefault();}} />
            <DialogTrigger className="relative h-8 w-8">
                Esewa
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Esewa Payment</DialogTitle>
                    <DialogDescription asChild>
                        this is the esewa payment form
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}