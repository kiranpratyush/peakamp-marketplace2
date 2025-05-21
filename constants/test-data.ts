import { PRODUCT_IMAGES } from './images';
export const mockproducts = [
    {
      id: "nmc-01",
      name: "NMC Black Mass",
      category: "BLACK MASS",
      description: "High-quality NMC black mass with optimal composition for battery manufacturing.",
      price: "₹28,500",
      unit: "per kg",
      seller: {
        name: "EcoRecycle Solutions",
        verified: true,
        avatar: "ER",
        rating: 4.9,
        salesCount: 152,
        responseTime: "2 hours"
      },
      ratings: 4.8,
      inStock: true,
      specifications: {
        "Nickel Content": "25-30%",
        "Cobalt Content": "15-20%",
        "Manganese Content": "10-15%",
        "Lithium Content": "5-7%"
      },
      bids: [
        { price: "₹27,800", quantity: "100kg", bidder: "VoltPower Tech",time:"2 days ago" },
        { price: "₹27,200", quantity: "50kg", bidder: "GreenBattery Inc",time:"3 days ago" }
      ],
      image: PRODUCT_IMAGES.NMC,
      availableQuantity: 250,
    },
    {
      id: "lfp-01",
      name: "LFP Black Mass",
      category: "BLACK MASS",
      description: "Premium LFP black mass with consistent quality and high recovery rates.",
      price: "₹22,000",
      unit: "per kg",
      seller: {
        name: "Green Battery Corp",
        verified: true,
        avatar: "GBC"
      },
      ratings: 4.6,
      inStock: true,
      specifications: {
        "Lithium Content": "3-4%",
        "Iron Content": "35-40%",
        "Phosphorus Content": "15-20%"
      },
      bids: [
        { price: "₹21,500", quantity: "75kg", bidder: "EcoCell Solutions",time:"2 days ago" }
      ],
      image: PRODUCT_IMAGES.LFP,
      availableQuantity: 250,
    },
    {
      id: "lco-01",
      name: "LCO Black Mass",
      category: "BLACK MASS",
      description: "High-purity LCO black mass with exceptional cobalt recovery.",
      price: "₹32,500",
      unit: "per kg",
      seller: {
        name: "CycleLife Materials",
        verified: true,
        avatar: "CM"
      },
      ratings: 4.9,
      inStock: true,
      specifications: {
        "Cobalt Content": "30-40%",
        "Lithium Content": "7-8%",
        "Copper Content": "5-7%"
      },
      bids: [],
      availableQuantity: 250,
      image: PRODUCT_IMAGES.LCO
    },
    {
      id: "copper-01",
      name: "Recycled Copper",
      category: "METAL",
      description: "High-purity copper recovered from battery components.",
      price: "₹4,800",
      unit: "per kg",
      seller: {
        name: "MetalPure Industries",
        verified: true,
        avatar: "MP"
      },
      ratings: 4.7,
      inStock: true,
      specifications: {
        "Purity": "99.9%",
        "Recovery Rate": "95%",
        "Energy Savings": "85%"
      },
      availableQuantity: 250,
      bids: [
        { price: "₹4,650", quantity: "200kg", bidder: "CircuitWorks" ,time:"2 days ago"},
        { price: "₹4,600", quantity: "150kg", bidder: "MetalReclaim Ltd",time:"2 days ago" }
      ],
      image: PRODUCT_IMAGES.COPPER
    },
    {
      id: "aluminium-01",
      name: "Recycled Aluminium",
      category: "METAL",
      description: "Recycled aluminum with excellent quality for various applications.",
      price: "₹2,800",
      unit: "per kg",
      seller: {
        name: "LightMetal Recyclers",
        verified: false,
        avatar: "LM"
      },
      ratings: 4.5,
      inStock: true,
      specifications: {
        "Purity": "99.5%",
        "Recovery Rate": "90%",
        "Energy Savings": "95%"
      },
      availableQuantity: 250,
      bids: [
        { price: "₹2,750", quantity: "300kg", bidder: "AluCraft Systems",time:"2 days ago" }
      ],
      image: PRODUCT_IMAGES.ALUMINIUM
    },
    {
      id: "steel-01",
      name: "Recycled Steel",
      category: "METAL",
      description: "High-grade steel recovered from battery casings.",
      price: "₹1,950",
      unit: "per kg",
      seller: {
        name: "SteelRegen Corp",
        verified: true,
        avatar: "SR"
      },
      ratings: 4.4,
      inStock: false,
      specifications: {
        "Purity": "98%",
        "Recovery Rate": "95%",
        "Energy Savings": "75%"
      },
      availableQuantity: 250,
      bids: [],
      image: PRODUCT_IMAGES.STEEL
    },
    {
      id: "plastic-01",
      name: "Recycled Plastic",
      category: "NON METAL",
      description: "Recycled plastic materials from battery components with high reusability.",
      price: "₹1,200",
      unit: "per kg",
      seller: {
        name: "EcoPolymer Solutions",
        verified: true,
        avatar: "EP"
      },
      ratings: 4.3,
      inStock: true,
      specifications: {
        "Purity": "95%",
        "Recovery Rate": "90%",
        "Reusability": "100%"
      },
      availableQuantity: 250,
      bids: [
        { price: "₹1,150", quantity: "400kg", bidder: "PlastiTech Industries",time:"2 days ago"},
        { price: "₹1,100", quantity: "250kg", bidder: "GreenForm Materials",time:"2 days ago" }
      ],
      image: PRODUCT_IMAGES.PLASTIC
    }
  ];

  // Mock purchase order data
  export const purchaseOrders = [
    {
      id: "ORD-2024-0582",
      date: "2023-04-15",
      status: "Shipped",
      seller: "EcoRecycle Solutions",
      products: [
        { name: "NMC Black Mass", quantity: "50kg", price: "₹1,425,000", image: PRODUCT_IMAGES.NMC }
      ],
      total: "₹1,425,000",
      deliveryDate: "2023-04-22"
    },
    {
      id: "ORD-2024-0493",
      date: "2023-03-28",
      status: "Delivered",
      seller: "Green Battery Corp",
      products: [
        { name: "LFP Black Mass", quantity: "35kg", price: "₹770,000", image: PRODUCT_IMAGES.LFP },
        { name: "Recycled Copper", quantity: "15kg", price: "₹72,000", image: PRODUCT_IMAGES.COPPER }
      ],
      total: "₹842,000",
      deliveryDate: "2023-04-06"
    },
    {
      id: "ORD-2024-0381",
      date: "2023-03-10",
      status: "Delivered",
      seller: "LightMetal Recyclers",
      products: [
        { name: "Recycled Aluminium", quantity: "120kg", price: "₹336,000", image: PRODUCT_IMAGES.ALUMINIUM }
      ],
      total: "₹336,000",
      deliveryDate: "2023-03-18"
    }
  ];
  
  // Mock sale order data
 export  const saleOrders = [
    {
      id: "ORD-2024-0612",
      date: "2023-04-18",
      status: "New",
      customer: "VoltPower Technologies",
      products: [
        { name: "NMC Black Mass", quantity: "80kg", price: "₹2,280,000", image: PRODUCT_IMAGES.NMC }
      ],
      total: "₹2,280,000",
      fulfillByDate: "2023-04-30"
    },
    {
      id: "ORD-2024-0594",
      date: "2023-04-15",
      status: "Processing",
      customer: "GreenDrive Motors",
      products: [
        { name: "LFP Black Mass", quantity: "45kg", price: "₹990,000", image: PRODUCT_IMAGES.LFP }
      ],
      total: "₹990,000",
      fulfillByDate: "2023-04-25"
    },
    {
      id: "ORD-2024-0563",
      date: "2023-04-10",
      status: "Shipped",
      customer: "CircuitEV Solutions",
      products: [
        { name: "Recycled Copper", quantity: "120kg", price: "₹576,000", image: PRODUCT_IMAGES.COPPER }
      ],
      total: "₹576,000",
      shippedDate: "2023-04-17",
      trackingId: "PMP-97364512"
    }
  ];
  
  // Mock bid data
  export const bids = [
    {
      id: "BID-2024-0021",
      date: "2023-04-17",
      product: "NMC Black Mass",
      seller: "EcoRecycle Solutions",
      bidAmount: "₹27,500",
      quantity: "100kg",
      status: "Pending",
      expiresAt: "2023-04-24",
      image: PRODUCT_IMAGES.NMC
    },
    {
      id: "BID-2024-0018",
      date: "2023-04-14",
      product: "Recycled Copper",
      seller: "MetalPure Industries",
      bidAmount: "₹4,600",
      quantity: "200kg",
      status: "Accepted",
      expiresAt: "2023-04-21",
      image: PRODUCT_IMAGES.COPPER
    },
    {
      id: "BID-2024-0015",
      date: "2023-04-10",
      product: "Recycled Plastic",
      seller: "EcoPolymer Solutions",
      bidAmount: "₹1,100",
      quantity: "300kg",
      status: "Rejected",
      expiresAt: "2023-04-17",
      image: PRODUCT_IMAGES.PLASTIC
    }
  ];
  