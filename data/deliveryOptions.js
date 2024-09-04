export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCent: 0
  },
  {
    id: '2',
    deliveryDays: 3,
    priceCent: 499
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCent: 999
  },
]

// функция получить данные из доставки 
export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId) {
      deliveryOption = option
    }
  });
  return deliveryOption || deliveryOptions[0];
}