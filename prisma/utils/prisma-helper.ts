export function handlePrismaError(error: any) {
    if (error.code === 'P2002') {
      return { message: 'Duplicate entry detected' };
    }

    if (error.code === 'P2003') {
      return { message: 'Foreign key constraint failed' };
    }

    if (error.code === 'P2025') {
      return { message: 'Record not found' };
    }
    return { message: 'An unknown error occurred' };
  }
  