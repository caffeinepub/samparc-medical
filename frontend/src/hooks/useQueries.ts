import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Medicine } from '../backend';

export function useListMedicines() {
  const { actor, isFetching } = useActor();
  return useQuery<Medicine[]>({
    queryKey: ['medicines'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMedicines();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAvailableMedicines() {
  const { actor, isFetching } = useActor();
  return useQuery<Medicine[]>({
    queryKey: ['medicines', 'available'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAvailableMedicines();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchMedicines(search: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Medicine[]>({
    queryKey: ['medicines', 'search', search],
    queryFn: async () => {
      if (!actor || !search.trim()) return [];
      return actor.searchMedicines(search);
    },
    enabled: !!actor && !isFetching && search.trim().length > 0,
  });
}

export function useAddMedicine() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; description: string; price: number; category: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addMedicine(data.name, data.description, BigInt(Math.round(data.price * 100)), data.category);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
    },
  });
}

export function useEditMedicine() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: bigint; name: string; description: string; price: number; category: string; available: boolean }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.editMedicine(data.id, data.name, data.description, BigInt(Math.round(data.price * 100)), data.category, data.available);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
    },
  });
}

export function useDeleteMedicine() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteMedicine(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
    },
  });
}

export function useGetAllContent() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<[string, string]>>({
    queryKey: ['content', 'all'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContent();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetContent(section: string) {
  const { actor, isFetching } = useActor();
  return useQuery<string | null>({
    queryKey: ['content', section],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getContent(section);
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { section: string; content: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateContent(data.section, data.content);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['content', variables.section] });
      queryClient.invalidateQueries({ queryKey: ['content', 'all'] });
    },
  });
}
