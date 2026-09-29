import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // In production, send to telemetry service; avoid noisy unhandled console spam
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full glass-panel bg-[#111827]/90 rounded-2xl p-8 border border-rose-500/30 text-center shadow-2xl space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
              <AlertCircle className="w-7 h-7" />
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-rose-400">
                Application Diagnostic
              </div>
              <h1 className="font-serif-luxury text-2xl font-bold text-white mt-1">
                Notice in Clinic Module
              </h1>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                An unexpected state occurred while rendering this view. Your saved clinical session is intact.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="btn-gold px-4 py-2.5 text-xs font-semibold flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reload Application</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.href = '/';
                }}
                className="btn-secondary px-4 py-2.5 text-xs flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Return to Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
