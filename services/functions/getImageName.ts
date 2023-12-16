export function getImageName(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1];
}
  