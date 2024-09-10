export async function getDoctors() {
  let doctors = null;
  try {
    doctors = await window.doctors.getDoctors();
  } catch (err) {
    throw new Error('تعذر تحميل بيانات الأطباء');
  }
  return doctors;
}
