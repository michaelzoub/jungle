export type Job = {
    _id?: number;
    location: [number, number]; 
    jobType: string;
    status: string;
    review: string;
  
    customer: {
      first: string;
      last: string;
      email: string;
      phone: string;
      address: string;
    };
  
    details: {
      description: string;
      images: string[]; // Changed from File[] to string[] for base64 images
    };
  };