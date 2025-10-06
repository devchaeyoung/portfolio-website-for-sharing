// scripts/seed.ts
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

// -------------------- 유틸/랜덤 --------------------
const r = (n: number) => Math.floor(Math.random() * n)
const pick = <T>(arr: T[]) => arr[r(arr.length)]
const range = (n: number) => Array.from({ length: n }, (_, i) => i)
const dateWithin = (yearsBack = 5) => {
  const now = new Date()
  const past = new Date(now)
  past.setFullYear(now.getFullYear() - yearsBack)
  const t = past.getTime() + Math.random() * (now.getTime() - past.getTime())
  return new Date(t).toISOString().slice(0, 10)
}
const yearMonth = (y: number, m: number, d = 1) =>
  new Date(y, m - 1, d).toISOString().slice(0, 10)

const stacksPool = [
  'React',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'NestJS',
  'PostgreSQL',
  'Redux',
  'Zustand',
  'Next.js',
  'Tailwind',
  'Sass',
  'GraphQL',
  'Prisma',
]
const roles = ['FE', 'BE', 'Fullstack', 'Mobile', 'Data']
const issuers = [
  '한국개발상',
  '대한소프트대상',
  '서울IT어워드',
  'Korea Dev Prize',
  'OpenTech',
]
const certNames = [
  '정보처리기사',
  'SQLD',
  '네트워크관리사',
  '리눅스마스터',
  'ADsP',
]

const seoulUnis = [
  '서울대학교',
  '연세대학교',
  '고려대학교',
  '한양대학교',
  '성균관대학교',
  '서강대학교',
  '중앙대학교',
  '경희대학교',
  '한국외국어대학교',
  '서울시립대학교',
  '건국대학교',
  '국민대학교',
  '동국대학교',
  '이화여자대학교',
  '세종대학교',
  '홍익대학교',
  '서울과학기술대학교',
]
const majors = [
  '컴퓨터공학',
  '소프트웨어',
  '정보보호',
  '데이터사이언스',
  '전자공학',
  '산업공학',
]

// 한국 이름 3자 생성 (성 1 + 이름 2)
const familyNames = [
  '김',
  '이',
  '박',
  '최',
  '정',
  '조',
  '윤',
  '장',
  '임',
  '한',
  '오',
  '서',
  '신',
  '권',
  '황',
  '안',
  '송',
  '류',
  '전',
  '홍',
  '고',
  '문',
  '양',
  '손',
]
const givenFirst = [
  '민',
  '서',
  '도',
  '지',
  '유',
  '하',
  '준',
  '태',
  '수',
  '현',
  '예',
  '아',
  '승',
  '우',
  '시',
  '연',
  '재',
  '선',
  '다',
  '윤',
]
const givenSecond = [
  '준',
  '빈',
  '율',
  '진',
  '후',
  '영',
  '현',
  '리',
  '빈',
  '연',
  '원',
  '아',
  '환',
  '우',
  '림',
  '혁',
  '솔',
  '별',
  '환',
  '미',
]

const makeName = () => pick(familyNames) + pick(givenFirst) + pick(givenSecond)

// -------------------- 타입 --------------------
type AppUserRow = {
  user_id: string | null
  email: string
  name: string
  stacks: string[]
  description: string | null
  profile_image: string | null
}

type ProjectRow = {
  user_id: string
  title: string
  role: string | null
  description: string | null
  start_date?: string | null
  end_date?: string | null
  author?: string | null
}

type AwardRow = {
  user_id: string
  title: string
  info: string | null
  issuer: string | null
  date: string
  author: string | null
}

type CertRow = {
  user_id: string
  title: string
  license: number
  issued_date: string
  issuer: string
  langscore: number | null
  author: string | null
}

type EduRow = {
  user_id: string
  title: string // 학교명
  major: string
  grades: number
  start_date: string
  end_date: string
  author: string | null
}

// -------------------- Supabase --------------------
const url = process.env.REACT_APP_SUPABASE_URL!
const key = process.env.REACT_APP_SUPABASE_ROLE_KEY!

if (!url || !key) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}
const supa = createClient(url, key)

// -------------------- mock data 생성 --------------------
const TOTAL_USERS = 80
const PASSWORD = '1234!@#$f'

const userSeeds = range(TOTAL_USERS).map(i => {
  const idx = String(i + 1).padStart(2, '0')
  const name = makeName()
  const email = `user${idx}@example.com`
  const stackCount = 2 + r(3) // 2~4개
  const stacks = Array.from(
    new Set(range(stackCount).map(() => pick(stacksPool)))
  )
  return {
    email,
    password: PASSWORD,
    name,
    stacks,
  }
})

// -------------------- Admin API: auth 사용자 보장 --------------------
async function ensureAuthUsers() {
  for (const u of userSeeds) {
    try {
      const { data, error } = await supa.auth.admin.createUser({
        email: u.email,
        password: u.password,
        email_confirm: true,
        user_metadata: { name: u.name },
      })
      if (error) {
        // 이미 존재하거나 정책상 생성 불가 등
        const msg = (error as any)?.message || String(error)
        if (
          msg.toLowerCase().includes('exists') ||
          msg.toLowerCase().includes('already')
        ) {
          console.log(`ℹ️ 이미 있는 유저: ${u.email}`)
        } else {
          console.warn(`⚠️ 유저 생성 실패: ${u.email} - ${msg}`)
        }
      } else {
        console.log(`✅ 유저 생성: ${u.email} (${data.user?.id})`)
      }
    } catch (e: any) {
      const msg = e?.message || String(e)
      if (
        msg.toLowerCase().includes('exists') ||
        msg.toLowerCase().includes('already')
      ) {
        console.log(`ℹ️ 이미 있는 유저: ${u.email}`)
      } else {
        console.warn(`⚠️ 유저 생성 예외: ${u.email} - ${msg}`)
      }
      // 다음 사용자 계속
    }
  }
}

async function mapEmailToAuthId(): Promise<
  Map<string, { id: string; name?: string | null }>
> {
  const map = new Map<string, { id: string; name?: string | null }>()
  let page = 1
  const perPage = 1000
  // 재시도 1회
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      while (true) {
        const { data, error } = await supa.auth.admin.listUsers({
          page,
          perPage,
        })
        if (error) throw error
        for (const u of data.users) {
          if (u.email)
            map.set(u.email, { id: u.id, name: (u.user_metadata as any)?.name })
        }
        if (data.users.length < perPage) break
        page += 1
      }
      return map
    } catch (e: any) {
      if (attempt === 2) {
        console.error('❌ listUsers 실패:', e?.message || String(e))
        throw e
      } else {
        console.warn('🔁 listUsers 재시도...')
        await new Promise(res => setTimeout(res, 500))
      }
    }
  }
  return map
}

// -------------------- 테이블 upsert/insert --------------------
async function upsertAppUsers(
  emailMap: Map<string, { id: string; name?: string | null }>
) {
  const rows: AppUserRow[] = userSeeds.map(u => ({
    user_id: emailMap.get(u.email)?.id ?? null,
    email: u.email,
    name: u.name,
    stacks: u.stacks,
    description: '목업 사용자입니다.',
    profile_image: null,
  }))
  try {
    const { error } = await supa
      .from('users')
      .upsert(rows, { onConflict: 'email' })
    if (error) {
      console.warn(
        '⚠️ users 업서트 실패(계속 진행):',
        (error as any)?.message || String(error)
      )
    } else {
      console.log(`✅ users 업서트 완료 (${rows.length} rows)`)
    }
  } catch (e: any) {
    console.warn('⚠️ users 업서트 예외(계속 진행):', e?.message || String(e))
  }
}

function batch<T>(arr: T[], size = 200): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

async function insertBatched(table: string, rows: any[]) {
  for (const chunk of batch(rows)) {
    try {
      const { error } = await supa.from(table).insert(chunk)
      if (error) {
        // 중복 키가 있거나 무결성 위반 등: 로그만 찍고 다음 배치로 진행
        console.warn(
          `⚠️ ${table} 배치 insert 실패(계속):`,
          (error as any)?.message || String(error)
        )
      }
    } catch (e: any) {
      console.warn(
        `⚠️ ${table} 배치 insert 예외(계속):`,
        e?.message || String(e)
      )
    }
  }
}

async function seedChildren(
  emailMap: Map<string, { id: string; name?: string | null }>
) {
  const projects: ProjectRow[] = []
  const awards: AwardRow[] = []
  const certs: CertRow[] = []
  const edus: EduRow[] = []

  for (const u of userSeeds) {
    const auth = emailMap.get(u.email)
    if (!auth) {
      console.warn(`⚠️ auth id 없음, 스킵: ${u.email}`)
      continue
    }
    const uid = auth.id
    const authorName = auth.name ?? u.name

    // projects 3
    for (let i = 1; i <= 3; i++) {
      const startY = 2021 + r(4) // 2021~2024
      const startM = 1 + r(12)
      const endY = startY + (r(2) === 0 ? 0 : 1)
      const endM = 1 + r(12)
      projects.push({
        user_id: uid,
        title: `프로젝트 ${i}`,
        role: pick(roles),
        description: `목업 프로젝트 설명 ${i}`,
        start_date: yearMonth(startY, startM),
        end_date: yearMonth(endY, endM),
        author: authorName,
      })
    }

    // awards 2
    for (let i = 1; i <= 2; i++) {
      awards.push({
        user_id: uid,
        title: `수상 ${i}`,
        info: `수상 설명 ${i}`,
        issuer: pick(issuers),
        date: dateWithin(6),
        author: authorName,
      })
    }

    // certifications 3
    for (let i = 1; i <= 3; i++) {
      certs.push({
        user_id: uid,
        title: pick(certNames),
        license: 10000 + r(90000),
        issued_date: dateWithin(8),
        issuer: pick(['큐넷', 'KPC', '정보통신진흥협회', '과기정통부']),
        langscore: r(3) === 0 ? 800 + r(150) : null,
        author: authorName,
      })
    }

    // education 1
    const sy = 2015 + r(8) // 2015~2022 입학
    const ey = sy + 4
    edus.push({
      user_id: uid,
      title: pick(seoulUnis),
      major: pick(majors),
      grades: 3 + r(2), // 3~4
      start_date: yearMonth(sy, 3, 1),
      end_date: yearMonth(ey, 2, 20),
      author: authorName,
    })
  }

  await insertBatched('projects', projects)
  await insertBatched('awards', awards)
  await insertBatched('certifications', certs)
  await insertBatched('educations', edus)

  console.log(
    `✅ children seeding 완료: projects=${projects.length}, awards=${awards.length}, certs=${certs.length}, edus=${edus.length}`
  )
}

// 비밀번호 강제 재설정(이미 존재하는 계정도 일괄 통일)
async function resetPasswords(emailMap: Map<string, { id: string }>) {
  for (const u of userSeeds) {
    const auth = emailMap.get(u.email)
    if (!auth) continue
    try {
      const { error } = await supa.auth.admin.updateUserById(auth.id, {
        password: PASSWORD,
      })
      if (error) {
        console.warn(
          `⚠️ 비번 재설정 실패(계속): ${u.email} - ${(error as any)?.message || String(error)}`
        )
      }
    } catch (e: any) {
      console.warn(
        `⚠️ 비번 재설정 예외(계속): ${u.email} - ${e?.message || String(e)}`
      )
    }
  }
}

// -------------------- 메인 --------------------
;(async () => {
  try {
    console.log('🔐 ensuring auth users...')
    await ensureAuthUsers()

    console.log('📧 mapping emails to auth ids...')
    const emailMap = await mapEmailToAuthId()

    console.log('👤 upserting app users...')
    await upsertAppUsers(emailMap)

    console.log('🧩 seeding projects/awards/certs/edus...')
    await seedChildren(emailMap)

    console.log('🔑 resetting passwords to unified value...')
    await resetPasswords(emailMap)

    console.log(
      '✅ Seed completed: users=80, per user -> projects=3, awards=2, certs=3, edus=1'
    )
  } catch (e) {
    console.error('❌ Seed failed(최상위):', (e as any)?.message || String(e))
    process.exit(1)
  }
})()
