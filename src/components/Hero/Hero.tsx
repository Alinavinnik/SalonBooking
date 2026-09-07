import css from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={`container ${css.hero}`}>
      <div className={css.collage}>
        <div className={`${css.photo} ${css.photo_1}`} />
        <div className={`${css.photo} ${css.photo_2}`} />
        <div className={`${css.photo} ${css.photo_3}`} />
      </div>
    </div>
  );
};

export default Hero;
