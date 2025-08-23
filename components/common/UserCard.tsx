import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface UserCardProps {
  name: string
  image: string
}

export function UserCard({ name, image }: Readonly<UserCardProps>) {
  return (
    <Card className="w-full max-w-xs text-center">
      <CardContent className="p-6 flex flex-col items-center gap-4">
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          className="rounded-full object-cover"
        />
        <h3 className="font-semibold text-lg">{name}</h3>
      </CardContent>
    </Card>
  )
}
