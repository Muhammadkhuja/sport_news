const router = require("express").Router();

const langROUTER = require("./lang.routes");
const categoryROUTER = require("./category.routes");
const newsROUTER = require("./news.routes");
const nwlangROUTE = require("./nwlang.routes");
const userROUTE = require("./user.routes");
const mediaROUTE = require("./media.routes");
const commentsROUTE = require("./comments.routes");
const reportsROUTE = require("./reports.routes");
const likesROUTE = require("./likes.routes");
const viewsROUTE = require("./views.routes");
const authorROUTE = require("./authors.routes");
const tagsROUTE = require("./tags.routes");
const news_tagROUTE = require("./news_tags.routes");
const notifactionsROUTE = require("./notifactions.routes");
const otpROUTE = require("./otp.routes")

router.use("/langs", langROUTER);
router.use("/category", categoryROUTER);
router.use("/news", newsROUTER);
router.use("/news_with_lang", nwlangROUTE);
router.use("/user", userROUTE);
router.use("/media", mediaROUTE);
router.use("/comments", commentsROUTE);
router.use("/reports", reportsROUTE);
router.use("/likes", likesROUTE);
router.use("/viewed", viewsROUTE);
router.use("/authors", authorROUTE);
router.use("/tags", tagsROUTE);
router.use("/news_tag", news_tagROUTE);
router.use("/notifactions", notifactionsROUTE);
router.use("/otp", otpROUTE)

module.exports = router;
