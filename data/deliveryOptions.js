import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

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

// функция вычисляет дату
function isWeekend (date) {
  const dayOfWeek = date.format('dddd')
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}

// функция вычисляет дату доставки и форматирует ее
export function calculateDeliveryDate (deliveryOption) {
  // const today = dayjs();
  // const deliveryDate = today.add(deliveryOptions.deliveryDays, 'days');
  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = dayjs();

  while(remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'day');

    if(!isWeekend(deliveryDate)) {
      remainingDays--;
    }
  }

  const dateString = deliveryDate.format('dddd, MMMM D');

  return dateString
}

