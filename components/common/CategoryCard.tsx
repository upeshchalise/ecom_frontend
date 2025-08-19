import { Card, CardContent } from "@/components/ui/card";

type CategoryCardProps = {
  name: string;
  productCount: number;
  onClick?: () => void;
};

const CategoryCard = ({ name, productCount, onClick }: CategoryCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="bg-[#fffaf3] border border-[#d6c7b0] shadow-md hover:shadow-lg transition rounded-xl cursor-pointer"
    >
      <CardContent className="p-6">
        <h2 className="text-xl font-bold text-[#5c4425]">{name}</h2>
        <p className="text-sm text-[#6e5435]">{productCount} products</p>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
