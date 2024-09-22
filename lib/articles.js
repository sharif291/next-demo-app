import { redirect } from 'next/navigation';
import clientPromise from './mongodb';
import slugify from 'slugify';
import xss from 'xss';
import { getServerSession } from 'next-auth';
const client = await clientPromise
const database = client.db('hairbox_store');
const collection = await database.collection('news')

export async function createArticle(formData) {
  "use server"
  const session = await getServerSession()
  // console.log("ses", sess)
  // return
  let article = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    content: formData.get('content'),
    image: formData.get('image'),
  }
  article.creatorName = session.user.name
  article.creatorEmail = session.user.email
  article.slug = slugify(article.title, { lower: true })
  article.content = xss(article.content);
  article.date = new Date().toISOString().split("T")[0]
  await collection.insertOne(article)
  redirect(`/articles/${article.slug}`)
}

export async function getAllArticles() {
  const articles = await collection.find({}).toArray({ cache: "no-store" })
  return articles;
}

export async function getArticlesItem(slug) {
  const articlesItem = await collection.findOne({ slug, })
  return articlesItem;
}

export async function getLatestArticles() {
  const latestArticles = await collection.find({}).sort({ date: -1 }).limit(3).toArray();
  return latestArticles;
}

export async function getAvailableArticlesYears() {
  let years = await collection.aggregate([
    {
      $addFields: {
        dateConverted: { $dateFromString: { dateString: "$date" } }
      }
    },
    {
      $project: {
        year: { $year: "$dateConverted" }
      }
    },
    {
      $group: {
        _id: "$year"
      }
    },
    {
      $project: {
        _id: 0,
        year: "$_id"
      }
    }
  ]).toArray()
  years = years.map(x => x.year)
  return years;
}

export async function getAvailableArticlesMonths(year) {
  let months = await collection.aggregate([
    {
      $addFields: {
        dateConverted: { $dateFromString: { dateString: "$date" } }
      }
    },
    {
      $project: {
        year: { $year: "$dateConverted" },
        month: { $month: "$dateConverted" }
      }
    },
    {
      $match: {
        year: parseInt(year)
      }
    },

    {
      $group: {
        _id: "$month"
      }
    },
    {
      $project: {
        _id: 0,
        month: "$_id"
      }
    }
  ]).toArray()
  months = months.map(month => month.month);
  return months
}

export async function getArticlesForYear(year) {
  const articles = await collection.aggregate([
    {
      $project: {
        year: { $year: { $dateFromString: { dateString: "$date" } } },
        slug: 1,
        title: 1,
        content: 1,
        date: 1,
        image: 1,
        status: 1
      }
    },
    {
      $match: {
        year: parseInt(year),

      }
    }
  ]).toArray();
  return articles;
}

export async function getArticlesForYearAndMonth(year, month) {
  const articles = await collection.aggregate([
    {
      $project: {
        year: { $year: { $dateFromString: { dateString: "$date" } } },
        month: { $month: { $dateFromString: { dateString: "$date" } } },
        slug: 1,
        title: 1,
        content: 1,
        date: 1,
        image: 1,
        status: 1
      }
    },
    {
      $match: {
        year: parseInt(year),
        month: parseInt(month),

      }
    }
  ]).toArray();
  return articles;
}