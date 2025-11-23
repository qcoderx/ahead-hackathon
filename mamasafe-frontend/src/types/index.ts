/**
 * Core application types and interfaces
 */

export interface Drug {
  id: string;
  name: string;
  dosage: string;
  genericName?: string;
}

export interface DrugInteraction {
  id: string;
  drug1: Drug;
  drug2: Drug;
  severity: InteractionSeverity;
  description: string;
  clinicalImpact: string;
  recommendations: string[];
  isExpanded?: boolean;
}

export type InteractionSeverity = 'critical' | 'major' | 'moderate' | 'minor' | 'safe';

export interface User {
  id: string;
  name: string;
  title: string;
  clinic: string;
  avatar: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  isActive?: boolean;
}

export interface AnalysisResult {
  interactions: DrugInteraction[];
  totalInteractions: number;
  criticalCount: number;
  majorCount: number;
  moderateCount: number;
  minorCount: number;
}

/**
 * Component prop types
 */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps extends BaseComponentProps {
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  error?: string;
  label?: string;
  required?: boolean;
}