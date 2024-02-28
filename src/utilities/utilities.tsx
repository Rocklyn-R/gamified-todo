import movie from "../images/movie.png"
import videoGame from "../images/video-game.png"
import plane from "../images/plane.png"
import shopping from "../images/shopping.png"
import couch from "../images/couch.png"
import book from "../images/book.png"
import artist from "../images/artist.png"
import cocktail from "../images/cocktail.png"
import beauty from "../images/lipstick.png"
import music from "../images/music.png"
import phone from "../images/phone.png"
import gym from "../images/gym.png"
import sports from "../images/sports.png"
import nature from "../images/nature.png"
import headphones from "../images/headphones.png"
import money from "../images/money.png"
import love from "../images/love.png"
import gift from "../images/gift.png"

export const renderIcon = (icon: string) => {
    switch (icon) {
        case "movie":
            return movie;
        case "videoGame":
            return videoGame;
        case "plane":
            return plane;
        case "shopping":
            return shopping;
        case "couch":
            return couch;
        case "book":
            return book;
        case "artist":
            return artist;
        case "cocktail":
            return cocktail;
        case "beauty":
            return beauty;
        case "music":
            return music;
        case "phone":
            return phone;
        case "gym":
            return gym;
        case "sports":
            return sports;
        case "nature":
            return nature;
        case "headphones":
            return headphones;
        case "money":
            return money;
        case "love":
            return love;
        case "gift":
            return gift;
        default:
            return gift;

    }
}


export const formatDeadline = (deadline: string) => {
    const todayString = new Date().toISOString().slice(0, 10);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().slice(0, 10);

    const deadlineDateString = deadline.slice(0, 10);

      const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().slice(0, 10);

    if (deadlineDateString === todayString) {
        return "Today";
    } else if (deadlineDateString === tomorrowString) {
        return "Tomorrow";
    } else if (deadlineDateString === yesterdayString) {
        return "Yesterday";
    } else {
        const deadlineDate = new Date(deadline);
        const year = deadlineDate.getFullYear().toString().slice(-2);
        const month = (deadlineDate.getMonth() + 1).toString().padStart(2, "0");
        const day = deadlineDate.getDate().toString().padStart(2, "0");
        return `${month}/${day}/${year}`;
    }
}