export interface RegisterUserData {
  email: string;
  password: string;
  name: string;
  age: number;
}
export interface Owner {
  id: number;
  email: string;
  password: string;
  name: string;
  age: number;
}

export interface HardwareComponent {
  name: string;
  details: string;
  price: number;
}

export interface ImageUrl {
  url: string;
  details: string;
}

export interface Setup {
  setup_id: number;
  owner: Owner;
  hardware_components: Array<HardwareComponent>;
  image_urls: Array<ImageUrl>;
  details: string;
  last_updated: string;
  comments: Array<string>;
}

export interface SetupInput {
  setupId: number;
  ownerId: number;
  hardwareComponents: Array<string>;
  imageUrls: Array<string>;
  details: string;
  lastUpdated: Date;
}
