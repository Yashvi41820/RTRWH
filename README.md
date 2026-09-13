# RTRHW

# Member 2: Hydrological Math Engine & Sizing Micro-Service

## Core Mathematical Formulas

### 1. Annual Catchment Yield Formula
$$\text{Harvested Water (L/year)} = \text{Roof Area } (m^2) \times \text{Annual Rainfall } (mm) \times \text{Runoff Coefficient } (C) \times \text{Filter Efficiency } (\eta)$$

*   **Runoff Coefficients ($C$):** Concrete/Tiles ($0.85$), Metal sheet ($0.90$), Asphalt ($0.75$), Default ($0.80$).
*   **Filter Efficiency ($\eta$):** Standardized at $0.90$ (90%) for first-flush and mesh filtration units.

### 2. Infrastructure Sizing Algorithms
*   **Storage Tank Capacity:** Sized to match dry-season demand or capped at 20% of total annual harvest:
    $$\text{Tank Capacity (L)} = \min\left(\frac{\text{Annual Harvest}}{365} \times \text{Dry Days}, \text{Annual Harvest} \times 0.20\right)$$
*   **Downpipe Diameter:** Derived from catchment area requirements ($1\text{ cm}^2$ downpipe cross-section per $1\text{ m}^2$ roof area), rounded up to standard commercial sizes ($75\text{mm}, 110\text{mm}, 125\text{mm}$).
*   **Recharge Pit Sizing:** Sized for peak surge stormwater volume ($L \times W \times D$ in meters).

---

## API Endpoint Documentation

### `POST /api/v1/sizing/calculate`

Computes full hydrological harvest potential, physical infrastructure sizing dimensions, and itemized cost breakdowns.

#### Request Body (`application/json`)
```json
{
  "roofAreaSqM": 120,
  "annualRainfallMm": 950,
  "roofMaterial": "concrete",
  "dryDays": 45
}

#### Response Body (200 OK)
```json
{
  "success": true,
  "data": {
    "hydrology": {
      "roofAreaSqM": 120,
      "annualRainfallMm": 950,
      "roofMaterial": "concrete",
      "annualHarvestedWaterLiters": 87210
    },
    "sizing": {
      "optimalTankCapacityLiters": 10752,
      "gutterLengthMeters": 44,
      "downpipeDiameterMm": 125,
      "downpipeLengthMeters": 6,
      "rechargePit": {
        "lengthMeters": 1.7,
        "widthMeters": 1.5,
        "depthMeters": 2,
        "volumeCubicMeters": 5.1
      }
    },
    "costEstimation": {
      "breakdown": {
        "pvcPipes": 12500,
        "filtrationSystem": 4500,
        "storageTank": 80640,
        "pitExcavation": 3060,
        "laborAndInstallation": 3500
      },
      "totalCostINR": 103300
    }
  }
}

#### Testing the Endpoint Locally
You can test the API endpoint locally using PowerShell's native REST client:

```
Invoke-RestMethod -Uri "http://localhost:5000/api/v1/sizing/calculate" -Method Post -ContentType "application/json" -Body '{"roofAreaSqM": 120, "annualRainfallMm": 950, "roofMaterial": "concrete", "dryDays": 45}'

To view the full uncollapsed response object formatted cleanly:
```
$response = Invoke-RestMethod -Uri "http://localhost:5000/api/v1/sizing/calculate" -Method Post -ContentType "application/json" -Body '{"roofAreaSqM": 120, "annualRainfallMm": 950, "roofMaterial": "concrete", "dryDays": 45}'
$response.data | Format-List *



