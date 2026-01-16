/**
 * Shared type definitions for Chart.js
 */

import type { TooltipItem, ScriptableScaleContext } from 'chart.js';

/**
 * Type for Chart.js tooltip label callback context
 */
export type ChartTooltipContext = TooltipItem<'line' | 'bar' | 'doughnut'>;

/**
 * Type for Chart.js scale tick callback value
 */
export type ChartTickValue = string | number;

/**
 * Type for Chart.js scale tick callback context
 */
export type ChartTickContext = ScriptableScaleContext;
