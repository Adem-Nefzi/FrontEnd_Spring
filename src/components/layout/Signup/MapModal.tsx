"use client";

import { useState, useEffect, useRef } from "react";
import { X, Search, MapPin } from "lucide-react";

interface MapModalProps {
  onClose: () => void;
  onSelectAddress: (address: string) => void;
}

export default function MapModal({ onClose, onSelectAddress }: MapModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [address, setAddress] = useState("");
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Simulate geocoding
  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Simulate finding a location
      setSelectedLocation({ lat: 40.7128, lng: -74.006 });
      setAddress(searchQuery);
    }
  };

  // Simulate reverse geocoding when clicking on map
  const handleMapClick = () => {
    // Simulate selecting a random location
    const newLat = 40.7128 + (Math.random() - 0.5) * 0.1;
    const newLng = -74.006 + (Math.random() - 0.5) * 0.1;
    setSelectedLocation({ lat: newLat, lng: newLng });

    // Generate a fake address based on the coordinates
    const streetNames = [
      "Main St",
      "Broadway",
      "Park Ave",
      "5th Ave",
      "Madison Ave",
    ];
    const randomStreet =
      streetNames[Math.floor(Math.random() * streetNames.length)];
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    const newAddress = `${randomNumber} ${randomStreet}, New York, NY 10001`;
    setAddress(newAddress);
  };

  const confirmSelection = () => {
    if (address) {
      onSelectAddress(address);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">Select Location</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 border-b">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search for an address"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              className="h-10 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-[300px] p-4 overflow-hidden">
          <div
            ref={mapRef}
            className="w-full h-full bg-muted/30 rounded-md relative overflow-hidden"
            onClick={handleMapClick}
          >
            {!isMapLoaded ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : (
              <>
                {/* Simulated map UI */}
                <div className="absolute inset-0 bg-[#e8eaed] dark:bg-[#242f3e]">
                  <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] opacity-20">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={`h-${i}`}
                        className="border-t border-black/10 dark:border-white/10 col-span-full"
                      ></div>
                    ))}
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={`v-${i}`}
                        className="border-l border-black/10 dark:border-white/10 row-span-full"
                      ></div>
                    ))}
                  </div>

                  {/* Roads */}
                  <div className="absolute left-0 right-0 top-1/2 h-4 bg-gray-300 dark:bg-gray-700 -translate-y-1/2"></div>
                  <div className="absolute top-0 bottom-0 left-1/3 w-3 bg-gray-300 dark:bg-gray-700"></div>
                  <div className="absolute top-0 bottom-0 right-1/4 w-2 bg-gray-300 dark:bg-gray-700"></div>

                  {/* Buildings */}
                  <div className="absolute top-1/4 left-1/5 w-16 h-12 bg-gray-400 dark:bg-gray-600 rounded-sm"></div>
                  <div className="absolute bottom-1/3 right-1/3 w-20 h-16 bg-gray-400 dark:bg-gray-600 rounded-sm"></div>
                  <div className="absolute top-1/2 left-1/2 w-14 h-14 bg-gray-400 dark:bg-gray-600 rounded-sm"></div>

                  {/* Selected location pin */}
                  {selectedLocation && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary animate-bounce">
                      <MapPin className="h-8 w-8" />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {selectedLocation && (
          <div className="p-4 border-t">
            <div className="mb-4">
              <p className="text-sm font-medium mb-1">Selected Address:</p>
              <p className="p-2 bg-muted/50 rounded border">{address}</p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 border rounded-md hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmSelection}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Confirm Location
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
