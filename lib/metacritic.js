const BASE_URL = "https://www.freetogame.com/api";

function mapNames(data) {
  const { title, short_description, release_date, thumbnail, game_url } = data;

  return {
    description: short_description,
    releaseDate: release_date,
    score: 10,
    title: title,
    image: thumbnail,
    slug: game_url,
  };
}

export async function getLatestGames() {
  const LATEST_GAMES = `${BASE_URL}/games?sort-by=release-date`;

  const rawData = await fetch(LATEST_GAMES);
  const json = await rawData.json();

  return json.map((item) => {
    const response = mapNames(item);
    const { description, releaseDate, score, title, image, slug } = response;

    return {
      description,
      releaseDate,
      score,
      slug,
      title,
      image,
    };
  });
}

export async function getGameDetails(slug) {
  const GAME_DETAILS = `https://internal-prod.apigee.fandom.net/v1/xapi/composer/metacritic/pages/games/${slug}/web?&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u`;

  const rawData = await fetch(GAME_DETAILS);
  const json = await rawData.json();

  const { components } = json;
  const { title, description, criticScoreSummary, images } = components[0];
  const { score } = criticScoreSummary;

  // get the card image
  const cardImage = images.find((image) => image.typeName === "cardImage");
  const { bucketType, bucketPath } = cardImage;
  const img = `https://www.metacritic.com/a/img/${bucketType}${bucketPath}`;

  const rawReviews = components[3].data.items;

  // get the reviews
  const reviews = rawReviews.map((review) => {
    const { quote, score, date, publicationName, author } = review;
    return { quote, score, date, publicationName, author };
  });

  return {
    img,
    title,
    slug,
    description,
    score,
    reviews,
  };
}
