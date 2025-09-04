export default function FullScreenLoading() {
  return (
    <div className="bg-background fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="border-primary relative h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
        <p className="text-primary">Loading...</p>
      </div>
    </div>
  );
}
