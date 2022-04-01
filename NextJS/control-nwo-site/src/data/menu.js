const MENU = [
  {
    label: 'Products',
    url: '/products',
    sections: {
      byNeed: [
        { label: 'Marketing / Consumer Intelligence', url: '/products#marketing' },
        { label: 'Business Development / M&A', url: '/products#business' },
        { label: 'New Product Development', url: '/products#newproduct' },
      ],
      byIndustry: [
        { label: 'E-commerce', url: '/products#ecommerce' },
        { label: 'Consumer Health', url: '/products#consumerhealth' },
        { label: 'Consumer Product', url: '/products#consumerproduct' },
      ],
    }
  },
  {
    label: 'About Us',
    url: '/about-us',
    sections: {
      byNeed: [
        { label: 'Our Mission', url: '/about-us#mission' },
        { label: 'Leadership', url: '/about-us#leadership' },
      ],
      byIndustry: [
        { label: 'Advisory Board', url: '/about-us#advisory' },
        { label: 'Careers', url: '/about-us#careers' },
      ]
    }
  },
  {
    label: 'Technology',
    url: '/technology',
    sections: {
      byNeed: [
        { label: 'Overview', url: '/technology#overview' },
      ],
      byIndustry: [
        { label: 'Key Strengths', url: '/technology#strengths' },
      ]
    }
  },
  {
    label: 'Resources',
    url: '/resources',
    sections: {
      byNeed: [
        { label: 'Blogs', url: '/resources#blogs' },
        { label: 'News', url: '/resources#news' },
      ],
      byIndustry: [
        { label: 'Events', url: '/resources#events' },
      ]
    }
  },
  {
    label: 'Privacy Policy',
    url: '/privacy-notice',
    sections: []
  },
  {
    label: 'Terms & Conditions',
    url: '/terms-of-use',
    sections: []
  },
];

export default MENU;
