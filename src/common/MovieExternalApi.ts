export class MovieExternalApi {
  static getMovieURL(title: string) {
    return `http://www.omdbapi.com/?t=${title}&apikey=3b8182c4`;
  }
}