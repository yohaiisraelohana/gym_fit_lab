

export default function FoodList({searchFoodList , handleSelectFood}:{searchFoodList : TApiFood[] , handleSelectFood : (food:TApiFood) => void}) {
  return (
    <ul className="h-full w-full overflow-y-auto">
        {
            searchFoodList
                .map((food,ind)=>
                        (
                            <li 
                                onClick={()=>handleSelectFood(food)}
                                key={ind}
                                className="text-background text-end p-1 px-3 border-b border-background bg-white cursor-pointer "
                                >{food.shmmitzrach}
                            </li>
                        ))
        }
    </ul>
  )
}
