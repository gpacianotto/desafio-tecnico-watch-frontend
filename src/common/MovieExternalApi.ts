export class MovieExternalApi {
  static getMovieURL(title: string) {
    return `https://www.omdbapi.com/?t=${title}&apikey=3b8182c4`;
  }
}