import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CoverageMap = () => {
  const [selectedDivision, setSelectedDivision] = useState(null);

  const divisions = [
    {
      id: 1,
      name: "Dhaka Division",
      districts: ["Dhaka", "Gazipur", "Narayanganj", "Tangail", "Kishoreganj", "Manikganj", "Munshiganj", "Narsingdi", "Rajbari", "Faridpur", "Gopalganj", "Madaripur", "Shariatpur"],
      decorators: 28,
      lat: 23.8103,
      lng: 90.4125
    },
    {
      id: 2,
      name: "Chittagong Division",
      districts: ["Chittagong", "Cox\'s Bazar", "Comilla", "Feni", "Brahmanbaria", "Rangamati", "Noakhali", "Chandpur", "Lakshmipur", "Khagrachhari", "Bandarban"],
      decorators: 18,
      lat: 22.3569,
      lng: 91.7832
    },
    {
      id: 3,
      name: "Rajshahi Division",
      districts: ["Rajshahi", "Bogra", "Pabna", "Sirajganj", "Natore", "Naogaon", "Chapainawabganj", "Joypurhat"],
      decorators: 12,
      lat: 24.3745,
      lng: 88.6042
    },
    {
      id: 4,
      name: "Khulna Division",
      districts: ["Khulna", "Jessore", "Satkhira", "Bagerhat", "Jhenaidah", "Magura", "Narail", "Chuadanga", "Kushtia", "Meherpur"],
      decorators: 14,
      lat: 22.8456,
      lng: 89.5403
    },
    {
      id: 5,
      name: "Sylhet Division",
      districts: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
      decorators: 10,
      lat: 24.8949,
      lng: 91.8687
    },
    {
      id: 6,
      name: "Barisal Division",
      districts: ["Barisal", "Patuakhali", "Bhola", "Pirojpur", "Jhalokati", "Barguna"],
      decorators: 8,
      lat: 22.7010,
      lng: 90.3535
    },
    {
      id: 7,
      name: "Rangpur Division",
      districts: ["Rangpur", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon"],
      decorators: 9,
      lat: 25.7439,
      lng: 89.2752
    },
    {
      id: 8,
      name: "Mymensingh Division",
      districts: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
      decorators: 7,
      lat: 24.7471,
      lng: 90.4203
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            Bangladesh-Wide Coverage
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional decoration services available across all 64 districts of Bangladesh with local expertise
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="card p-6 space-y-4 order-2 lg:order-1">
            <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
              Service Coverage by Division
            </h3>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {divisions?.map((division) => (
                <div
                  key={division?.id}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    selectedDivision?.id === division?.id
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedDivision(division)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{division?.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Icon name="Users" size={16} />
                      <span>{division?.decorators} decorators</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="MapPin" size={14} />
                    <span>{division?.districts?.length} districts covered</span>
                  </div>
                  {selectedDivision?.id === division?.id && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-sm font-medium text-foreground mb-2">Districts:</p>
                      <div className="flex flex-wrap gap-2">
                        {division?.districts?.map((district, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            {district}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6 order-1 lg:order-2">
            <div className="aspect-[4/3] w-full rounded-lg overflow-hidden border border-border">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Bangladesh Service Coverage Map"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=23.6850,90.3563&z=7&output=embed"
                className="w-full h-full"
              />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-3xl font-bold text-primary">64</p>
                <p className="text-sm text-muted-foreground mt-1">Districts</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-3xl font-bold text-primary">8</p>
                <p className="text-sm text-muted-foreground mt-1">Divisions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageMap;