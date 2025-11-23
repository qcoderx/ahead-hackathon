"""
Service for normalizing drug names and mapping them to standard terminology.
"""
from typing import Dict, Optional
from thefuzz import process

class DrugNormalizationService:
    # Map of common names/brand names to generic names
    DRUG_MAP: Dict[str, str] = {
        "panadol": "Paracetamol",
        "panado": "Paracetamol",
        "tylenol": "Paracetamol",
        "acetaminophen": "Paracetamol",
        "brufen": "Ibuprofen",
        "advil": "Ibuprofen",
        "motrin": "Ibuprofen",
        "aspirin": "Acetylsalicylic acid",
        "disprin": "Acetylsalicylic acid",
        "augmentin": "Amoxicillin/Clavulanic acid",
        "amoxil": "Amoxicillin",
        "cipro": "Ciprofloxacin",
        "flagyl": "Metronidazole",
        "valium": "Diazepam",
        "xanax": "Alprazolam",
        "lipitor": "Atorvastatin",
        "zoloft": "Sertraline",
        "prozac": "Fluoxetine",
        "lasix": "Furosemide",
        "plavix": "Clopidogrel",
        "metformin": "Metformin",
        "glucophage": "Metformin",
        "ventolin": "Salbutamol",
        "folic acid": "Folic Acid",
        "ferrous sulphate": "Ferrous Sulfate",
        "iron": "Ferrous Sulfate",
    }

    @classmethod
    def normalize(cls, drug_name: str) -> str:
        """
        Normalize a drug name to its generic equivalent.
        Uses exact match first, then fuzzy matching if no exact match found.
        """
        if not drug_name:
            return ""
            
        drug_lower = drug_name.lower().strip()
        
        # 1. Direct lookup
        if drug_lower in cls.DRUG_MAP:
            return cls.DRUG_MAP[drug_lower]
            
        # 2. Check if it's already a generic name (value in map)
        # This is a simple check, in a real app we'd have a set of valid generics
        for generic in cls.DRUG_MAP.values():
            if generic.lower() == drug_lower:
                return generic

        # 3. Fuzzy matching
        # Get the best match from keys
        best_match, score = process.extractOne(drug_lower, cls.DRUG_MAP.keys())
        
        if score >= 85:  # High confidence threshold
            return cls.DRUG_MAP[best_match]
            
        # Return original if no good match found (let PharmaVigilance handle it)
        return drug_name

drug_normalization = DrugNormalizationService()
