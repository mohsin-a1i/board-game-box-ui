export default function cn(...classNames: (string | boolean | undefined)[]): string {
    return classNames.filter(c => !!c).join(' ')
}