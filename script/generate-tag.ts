import * as uuid from 'uuid';
import * as fs from 'fs';

const tags = [
  {
    id: '33c7dbca-c864-4f87-9c75-517f07014e80',
    name: 'Món ăn với cơm ',
    thumbnail: 'https://i.ibb.co/yS0cDNc/22-bento-128.png',
    created_at: '1953-01-07T22:02:01.414565593Z',
    updated_at: '1967-11-09T10:04:37.708228926Z',
  },
  {
    id: '23e54755-a1d5-4cf2-859e-b9b48ded29ec',
    name: 'Bún/Phở/Mì',
    thumbnail: 'https://i.ibb.co/smKSKvf/12-noodle-128.png',
    created_at: '1944-01-17T13:09:36.219461603Z',
    updated_at: '1910-01-01T19:18:16.400059141Z',
  },
  {
    id: '7ea3aa07-1b66-400d-a1b2-879e4263e346',
    name: 'Đồ uống',
    thumbnail: 'https://i.ibb.co/M7kP3Cq/Drink.png',
    created_at: '1925-10-24T03:13:39.897477938Z',
    updated_at: '1947-10-19T13:02:45.515487394Z',
  },
  {
    id: 'c78821d9-c83b-4bcd-b9af-f4a46c02e51d',
    name: 'Đồ ăn nhanh',
    thumbnail: 'https://i.ibb.co/K92KLtL/3-hamburger-128.png',
    created_at: '1925-10-24T03:13:39.897477938Z',
    updated_at: '1947-10-19T13:02:45.515487394Z',
  },
  {
    id: '5793e917-a900-40b8-a7b4-4cc845f07ec3',
    name: 'Ăn vặt',
    thumbnail: 'https://i.ibb.co/zNrmJcQ/25-ice-cream-128.png',
    created_at: '1925-10-24T03:13:39.897477938Z',
    updated_at: '1947-10-19T13:02:45.515487394Z',
  },
  {
    id: 'a4b9e5c6-5d0f-4cad-85f7-62a5977be3b5',
    name: 'Ăn Healthy',
    thumbnail: 'https://i.ibb.co/0swZnNx/23-egg-128.png',
    created_at: '1925-10-24T03:13:39.897477938Z',
    updated_at: '1947-10-19T13:02:45.515487394Z',
  },
  {
    id: '0dfb1b3b-5e37-450b-ad0d-01b4578b0107',
    name: 'Món lẩu',
    thumbnail: 'https://i.ibb.co/WgSQCnL/9-thai-soup-128.png',
    created_at: '1925-10-24T03:13:39.897477938Z',
    updated_at: '1947-10-19T13:02:45.515487394Z',
  },
  {
    id: 'e24d668b-9117-4c2f-b4dc-84cf1588f4c4',
    name: 'Hải sản',
    thumbnail: 'https://i.ibb.co/nj8LNbc/1-shrimp-128.png',
    created_at: '1925-10-24T03:13:39.897477938Z',
    updated_at: '1947-10-19T13:02:45.515487394Z',
  },
  {
    id: 'b033d16e-99b0-4072-b56e-d0be6878e975',
    name: 'Đồ ngọt',
    thumbnail: 'https://i.ibb.co/L0MZY56/29-pie-128.png',
    created_at: '1925-10-24T03:13:39.897477938Z',
    updated_at: '1947-10-19T13:02:45.515487394Z',
  },
  {
    id: 'b470cbfa-80dc-4682-9ea7-d71158c54e33',
    name: 'Đặc sản 3 miền',
    thumbnail: 'https://i.ibb.co/2c525vm/28-dango-128.png',
    created_at: '1925-10-24T03:13:39.897477938Z',
    updated_at: '1947-10-19T13:02:45.515487394Z',
  },
  {
    id: '97a2569a-063a-46dd-ae79-5a1aa29c3073',
    name: 'Đặc sản nước ngoài',
    thumbnail: 'https://i.ibb.co/bvZNLYT/7-steak-128.png',
    created_at: '1925-10-24T03:13:39.897477938Z',
    updated_at: '1947-10-19T13:02:45.515487394Z',
  },
  {
    id: 'caeb4770-ab48-49eb-86a0-8ab0632cb42d',
    name: 'Món soup/canh',
    thumbnail: 'https://i.ibb.co/2cVfY6s/14-meatball-128.png',
    created_at: '1925-10-24T03:13:39.897477938Z',
    updated_at: '1947-10-19T13:02:45.515487394Z',
  },
  {
    id: '6d5a0bea-723a-43a0-94aa-6c144e62120f',
    name: 'Món ngon 10 phút',
    thumbnail: 'https://i.ibb.co/KwQmrYs/2-sausage-128.png',
    created_at: '1925-10-24T03:13:39.897477938Z',
    updated_at: '1947-10-19T13:02:45.515487394Z',
  },
  {
    id: 'ec9d568b-f394-4211-9d71-b99120791ab5',
    name: 'Dinh dưỡng cao',
    thumbnail: 'https://i.ibb.co/tqD3z8c/10-oyster-128.png',
    created_at: '1925-10-24T03:13:39.897477938Z',
    updated_at: '1947-10-19T13:02:45.515487394Z',
  },
  {
    id: '78b18169-5a2a-4f38-8994-acca7c4755ff',
    name: 'Bữa sáng',
    thumbnail: 'https://i.ibb.co/Y29ZWMv/6-breakfast-128.png',
    created_at: '1925-10-24T03:13:39.897477938Z',
    updated_at: '1947-10-19T13:02:45.515487394Z',
  },
  {
    id: 'ff686fcc-5131-4efa-9500-117931d9d937',
    name: 'Bữa trưa',
    thumbnail: 'https://i.ibb.co/XVyfYpJ/16-fied-rice-128.png',
    created_at: '1925-10-24T03:13:39.897477938Z',
    updated_at: '1947-10-19T13:02:45.515487394Z',
  },
  {
    id: '3bcc4666-c8c2-43a7-bf0f-4a7a19cebf26',
    name: 'Bữa tối',
    thumbnail: 'https://i.ibb.co/L9SXPW3/13-spaghetti-128.png',
    created_at: '1925-10-24T03:13:39.897477938Z',
    updated_at: '1947-10-19T13:02:45.515487394Z',
  },
  {
    id: '8df60772-1744-476b-b860-43373d0d4ca2',
    name: 'Salad',
    thumbnail: 'https://i.ibb.co/vPNWkVb/19-salad-128.png',
    created_at: '1925-10-24T03:13:39.897477938Z',
    updated_at: '1947-10-19T13:02:45.515487394Z',
  },
];

const newTags = tags.map((tag) => ({
  ...tag,
  id: uuid.v4(),
}));

fs.writeFileSync('./tags.json', JSON.stringify(newTags));
