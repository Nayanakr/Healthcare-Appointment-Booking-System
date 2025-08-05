// Hospital data for the application

// List of departments in the hospital
export const departments = [
  "General",
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Dermatology",
  "Ophthalmology",
  "ENT",
];

// Mapping of departments to their respective doctors
export const doctors = {
  General: ["Dr. John Smith", "Dr. Emily Wilson"],
  Cardiology: ["Dr. Robert Johnson", "Dr. Sarah Miller"],
  Neurology: ["Dr. Michael Brown", "Dr. Lisa Davis"],
  Orthopedics: ["Dr. David Clark", "Dr. Jennifer White"],
  Pediatrics: ["Dr. James Martinez", "Dr. Patricia Lee"],
  Dermatology: ["Dr. Thomas Anderson", "Dr. Elizabeth Taylor"],
  Ophthalmology: ["Dr. Richard Moore", "Dr. Susan Harris"],
  ENT: ["Dr. Charles Wilson", "Dr. Mary Robinson"],
};

// Time slots available for appointments
export const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", 
  "04:00 PM", "04:30 PM", "05:00 PM"
];

// Services offered by the hospital
export const services = [
  {
    id: 1,
    name: "General Consultation",
    description: "Regular checkups and general health consultations",
    department: "General"
  },
  {
    id: 2,
    name: "Heart Screening",
    description: "Comprehensive cardiac evaluation and diagnostics",
    department: "Cardiology"
  },
  {
    id: 3,
    name: "Neurological Assessment",
    description: "Brain and nervous system examinations",
    department: "Neurology"
  },
  {
    id: 4,
    name: "Joint & Bone Treatment",
    description: "Diagnosis and treatment of musculoskeletal issues",
    department: "Orthopedics"
  },
  {
    id: 5,
    name: "Child Healthcare",
    description: "Specialized healthcare for infants, children, and adolescents",
    department: "Pediatrics"
  },
  {
    id: 6,
    name: "Skin Consultation",
    description: "Diagnosis and treatment of skin conditions",
    department: "Dermatology"
  },
  {
    id: 7,
    name: "Eye Examination",
    description: "Vision tests and eye health assessments",
    department: "Ophthalmology"
  },
  {
    id: 8,
    name: "ENT Consultation",
    description: "Ear, nose, and throat examinations and treatments",
    department: "ENT"
  }
];
