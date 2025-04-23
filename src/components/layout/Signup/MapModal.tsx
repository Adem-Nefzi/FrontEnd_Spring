"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { X, Search, MapPin, Loader2, Check } from "lucide-react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// This component updates the map view when coordinates change
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, 13);
  return null;
}

// MapClickHandler component to handle map clicks
function MapClickHandler({
  onClick,
}: {
  onClick: (e: L.LeafletMouseEvent) => void;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    map.on("click", onClick);

    return () => {
      map.off("click", onClick);
    };
  }, [map, onClick]);

  return null;
}

// Custom marker icon
const createCustomIcon = () => {
  return new L.Icon({
    iconUrl:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYgMkM5LjM4MiAyIDQgNy4zODIgNCAxNEM0IDE5LjA1IDcuMDUgMjUuMDQ2IDE2IDMwQzI0Ljk1IDI1LjA0NiAyOCAxOS4wNSAyOCAxNEMyOCA3LjM4MiAyMi42MTggMiAxNiAyWiIgZmlsbD0iIzNiODJmNiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTE2IDE4QzE4LjIwOTEgMTggMjAgMTYuMjA5MSAyMCAxNEMyMCAxMS43OTA5IDE4LjIwOTEgMTAgMTYgMTBDMTMuNzkwOSAxMCAxMiAxMS43OTA5IDEyIDE0QzEyIDE2LjIwOTEgMTMuNzkwOSAxOCAxNiAxOFoiIGZpbGw9IndoaXRlIi8+PC9zdmc+",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

interface MapModalProps {
  onClose: () => void;
  onSelectAddress: (address: string) => void;
  initialAddress?: string;
}

function MapModal({
  onClose,
  onSelectAddress,
  initialAddress = "",
}: MapModalProps) {
  const [searchQuery, setSearchQuery] = useState(initialAddress);
  const [position, setPosition] = useState<[number, number]>([
    40.7128, -74.006,
  ]); // Default to NYC
  const [address, setAddress] = useState(initialAddress);
  const [isLoading, setIsLoading] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [animateMarker, setAnimateMarker] = useState(false);

  // Fix Leaflet icon issue
  useEffect(() => {
    // Only run this on client side
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });

    setIsMapReady(true);
  }, []);

  // Initialize with user's location if available
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          reverseGeocode(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          // Use default position if user denies location access
        }
      );
    }

    // If we have an initial address, try to geocode it
    if (initialAddress) {
      geocodeAddress(initialAddress);
    }
  }, [initialAddress]);

  // Geocode address to coordinates
  const geocodeAddress = async (address: string) => {
    setSearchLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        setPosition([
          Number.parseFloat(data[0].lat),
          Number.parseFloat(data[0].lon),
        ]);
        setAddress(data[0].display_name);

        // Animate marker when location changes
        setAnimateMarker(true);
        setTimeout(() => setAnimateMarker(false), 1000);
      }
    } catch (error) {
      console.error("Error geocoding address:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  // Reverse geocode coordinates to address
  const reverseGeocode = async (lat: number, lon: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();

      if (data && data.display_name) {
        setAddress(data.display_name);
        setSearchQuery(data.display_name);
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle map click
  const handleMapClick = (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);

    // Animate marker when location changes
    setAnimateMarker(true);
    setTimeout(() => setAnimateMarker(false), 1000);

    reverseGeocode(lat, lng);
  };

  // Handle search button click
  const handleSearch = () => {
    if (searchQuery.trim()) {
      geocodeAddress(searchQuery);
    }
  };

  // Handle selection confirmation
  const confirmSelection = () => {
    if (address) {
      onSelectAddress(address);
    }
  };

  // Custom marker component with animation
  const customIcon = createCustomIcon();

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-background rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden border border-border/40">
        {/* Header */}
        <div className="p-5 border-b flex items-center justify-between bg-gradient-to-r from-primary/10 to-background">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Select Your Location</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted/80 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search bar */}
        <div className="p-5 border-b bg-muted/30">
          <div className="flex gap-2 relative">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder="Search for an address or place"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background focus:border-primary transition-all"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              className="h-11 px-5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 font-medium shadow-sm"
              disabled={searchLoading}
            >
              {searchLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 p-0 relative overflow-hidden">
          <div className="absolute top-4 right-4 z-10 bg-background/90 rounded-lg shadow-lg p-2 text-xs backdrop-blur-sm border border-border/40">
            <p className="font-medium">
              Click anywhere on the map to select a location
            </p>
          </div>

          <div
            className="w-full h-full rounded-none overflow-hidden"
            style={{ height: "600px" }}
          >
            {isMapReady && (
              <MapContainer
                center={position}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
                zoomControl={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={position}
                  icon={customIcon}
                  eventHandlers={{
                    add: (e) => {
                      if (animateMarker) {
                        const markerElement = e.target._icon;
                        if (markerElement) {
                          markerElement.classList.add("animate-bounce");
                          setTimeout(() => {
                            markerElement.classList.remove("animate-bounce");
                          }, 1000);
                        }
                      }
                    },
                  }}
                />
                <ChangeView center={position} />
                <MapClickHandler onClick={handleMapClick} />
              </MapContainer>
            )}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                <div className="bg-background p-4 rounded-lg shadow-lg flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <p>Loading location data...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Selected address and actions */}
        <div className="p-5 border-t bg-gradient-to-r from-background to-primary/5">
          <div className="mb-4 bg-background p-3 rounded-lg border border-border/60 shadow-sm">
            <p className="text-sm font-medium text-primary mb-1 flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              Selected Address:
            </p>
            <p
              className={`text-sm rounded transition-all ${
                address ? "" : "text-muted-foreground italic"
              }`}
            >
              {address || "No address selected yet"}
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border rounded-lg hover:bg-muted transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={confirmSelection}
              disabled={!address}
              className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:pointer-events-none shadow-sm"
            >
              <Check className="h-4 w-4" />
              Confirm Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapModal;
